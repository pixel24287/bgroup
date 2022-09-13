import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import axios from 'axios'
import searchIcon from '../icons/searchIcon.svg'

import styles from '../style/Selector.module.css'
import { ContentList } from './ContentList'
import jwtDecode from 'jwt-decode'

export const Selector = ({json}) => {
    //리액트 훅으로 각 상태 관리
    const [select, setSelect] = useState('title+desc');
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [send, setSend] = useState(false)
    const [count, setCount] = useState(0)
    const [searchPageNumber, setSearchPageNumber] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const [router, setRouter] = useState(json.router)
    const [buttonSubmit, setButtonSubmit] = useState(false)

    //연속클릭 차단 딜레이 훅
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e) => {
        setDisabled(true);
        //새로고침 할 필요 없어서 디폴트 값으로 고정
        e.preventDefault();
        //딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000))
        //axios 로 비동기 처리 보내기
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/${json.router}/list/search/${searchPageNumber - 1}`,
        {
            select : select,
            search : search
        },{
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((res) => {
            setSend(true)
            setData(res.data.list)
            setCount(res.data.count)
            setSearchPageNumber(1)
        })
        .catch((err) => {
            console.log(err);
        })
        setDisabled(false);
    }    

    useEffect(() => {
        setSearchPageNumber(1)
    }, [json.router])

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/${json.router}/list/search/${searchPageNumber - 1}`,
        {
            select : select,
            search : search
        },{
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then((res) => {
            setData(res.data.list)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [searchPageNumber])

    
    useEffect(() => {
        if((json.router === 'notice' || json.router === 'product') && userInfo.isAdmin) {
            setButtonSubmit(true)
        }
        else if(json.router === 'inquire') {
            setButtonSubmit(true)
        }        
        else if(json.router === 'claim') {
            setButtonSubmit(true)
        } 
        else if(json.router === 'business_approval') {
            setButtonSubmit(true)
        }
        else if(json.router === 'order_registration' && userInfo.id) {
            setButtonSubmit(true)
        }
    }, [userInfo])

    useEffect(() => {
        if (json.router === 'business_approval') {
            setRouter('BusinessApproval')
        }
        else if (json.router === 'order_registration') {
            setRouter('OrderRegistration')
        }
        else {
            setRouter(router.charAt(0).toUpperCase() + router.slice(1))
        }
        if (json.cookies.accessToken) {
        setUserInfo(jwtDecode(json.cookies.accessToken))
        }
        
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.select_container}>
                        <select className={styles.select} value={select} onChange={(e) => {setSelect(e.target.value)}}>
                            <option value='title+desc'>제목&amp;내용</option>
                            <option value='title'>제목</option>
                            <option value='desc'>내용</option>
                            <option value='nick_name'>글쓴이</option>
                        </select>
                        <input type='text' className={styles.search_bar} value={search} maxLength={50} onChange={(e) => setSearch(e.target.value)}></input>
                        <button type='submit' className={styles.button} disabled={disabled}><Image src={searchIcon} width={38.4} height={38.4}></Image></button>
                    </div>
                    {buttonSubmit ?
                    <>
                        <Link href={`/create${router}`}>
                            <a className={styles.AdminButton} >쓰기</a>
                        </Link>
                    </>
                    :
                    <>
                        <p className={styles.buttons}>쓰기</p>
                    </>}
                </form>
                <div className={styles.content_list}>
                    <ContentList data={data} send={send} router={json.router} cookies={json.cookies} searchPageNumber={searchPageNumber} setSearchPageNumber={setSearchPageNumber} count={count} />
                </div>                
            </div>

        </div>
    )
}
