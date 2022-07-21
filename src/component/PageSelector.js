import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import axios from 'axios'
import searchIcon from '../icons/searchIcon.svg'

import styles from '../style/Selector.module.css'
import { PageContentList } from './PageContentList'
import jwtDecode from 'jwt-decode'

export const PageSelector = ({json}) => {
    //리액트 훅으로 각 상태 관리
    const [select, setSelect] = useState('title+desc');
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [send, setSend] = useState(false)
    const [count, setCount] = useState(0)
    const [searchPageNumber, setSearchPageNumber] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const [router, setRouter] = useState(json.router)
    const [page_id, setPage_id] = useState(json.page_id)
    const [buttonSubmit, setButtonSubmit] = useState(false)
    const [delay, setDelay] = useState(0)

    const route = useRouter()
    const API_URL = "http://localhost:5000";

    //연속클릭 차단 딜레이 훅
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e) => {
        setDisabled(true);
        //새로고침 할 필요 없어서 디폴트 값으로 고정
        e.preventDefault();
        if (search.length < 1) {
            alert('검색어를 입력해주세요.')
        } else {
            //딜레이 추가
            await new Promise((resolve) => setTimeout(resolve, 1000))
            //axios 로 비동기 처리 보내기
            axios.post(`${API_URL}/api/${json.router}/list/search/${searchPageNumber - 1}/${page_id}`,
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
                alert('삭제된 계시판입니다.')
                route.back()
            })
        }
        setDisabled(false);
    }    

    useEffect(() => {
        setSearchPageNumber(1)
        setTimeout(() => {
            setDelay(1)
        }, 2500)
    }, [json.router])

    useEffect(() => {
        setPage_id(json.page_id)
    }, [json.page_id])

    useEffect(() => {
        if(delay && search.length < 1) {
            alert('검색어를 입력해주세요.')
        } else {
            axios.post(`${API_URL}/api/${json.router}/list/search/${searchPageNumber - 1}/${page_id}`,
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
                alert('삭제된 계시판입니다.')
                route.back()
            })
        }
    }, [searchPageNumber])

    
    useEffect(() => {
        if(json.router === 'product' && userInfo.isAdmin) {
            setButtonSubmit(true)
        }
    }, [userInfo])

    useEffect(() => {
        setRouter(router.charAt(0).toUpperCase() + router.slice(1))
        if (json.cookies.accessToken) {
        setUserInfo(jwtDecode(json.cookies.accessToken))
        }
        
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
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
                        <Link href={`/create${router}/${page_id}`}>
                            <a className={styles.AdminButton} >쓰기</a>
                        </Link>
                    </>
                    :
                    <>
                        <a className={styles.buttons}>쓰기</a>
                    </>}
                </form>
                <div className={styles.content_list}>
                    <PageContentList data={data} send={send} router={json.router} cookies={json.cookies} searchPageNumber={searchPageNumber} setSearchPageNumber={setSearchPageNumber} count={count} page_id={json.page_id} />
                </div>                
            </div>
        </div>
    )
}
