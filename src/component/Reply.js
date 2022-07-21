import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../style/Reply.module.css'
import Image from 'next/image'

import checkIcon from '../icons/check.svg'

export const Reply = ({data, cookies, route}) => {
    //날짜
    let past = new Date(data.created_at);
    const year = past.getFullYear()
    const month = ('0' + (past.getMonth() + 1)).slice(-2);
    const day = ('0' + past.getDate()).slice(-2);
    const hour = past.getHours()
    const minute = past.getMinutes()
    const second = past.getSeconds()

    const API_URL = 'http://localhost:5000'
    const UPLOAD_ENDPOINT = route
    const router = useRouter()

    const [reply, setReply] = useState(false)
    const [description, setDescription] = useState(data.description)
    //연속클릭 차단 딜레이 훅
    const [disabled, setDisabled] = useState(false);
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if(cookies.accessToken) {
          setUserInfo(jwtDecode(cookies.accessToken))
        }
    }, []);

    const handleSubmit = async (e) => {
        setDisabled(true);
        //새로고침 할 필요 없어서 디폴트 값으로 고정
        e.preventDefault();
        //딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000))
        //특정 조건으로 막기 가능
        if(description.length < 1) {
            alert('내용을 작성해주세요.')
        } else {
            //axios 로 비동기 처리 보내기
            axios.put(`${API_URL}/api/${UPLOAD_ENDPOINT}_comment/reply/${userInfo.id}`,
            {
                description : description,
                comment_id : data.id,
            },{
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',

                    'token': `Bearer ${cookies.accessToken}`
                }
            })
            .then((res) => {
                alert('답댓글 업데이트 성공')
                router.reload()
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert('세션이 만료되었습니다.')
                } else {
                    alert('error 발생')
                }
            })
        }
        setDisabled(false);
    }

    const deleteSubmit = async () => {
        axios.delete(`${API_URL}/api/${UPLOAD_ENDPOINT}_comment/reply/${userInfo.id}`,
        {
            data : {
                comment_id : data.id
            },
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json',
        
                'token': `Bearer ${cookies.accessToken}`
            },
            withCredentials: true
        })
        .then((res) => {
            alert('답댓글 삭제 성공')
            router.reload()
        })
        .catch((err) => {
            alert('Error 404')
            console.log(err)
        })
    }
    
    if(reply) {
        return (
            <>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div>
                        <span className={styles.nick_name}>{data.nick_name}{data.admin ? <span className={styles.image}><Image src={checkIcon} width='16' height='16' /></span> : <></>}</span>
                        <span className={styles.date}>{year}.{month}.{day} {hour <= 12 ? `오전 ${hour}` : `오후 ${hour-12}`}:{minute}:{second}</span>
                    </div>
                    <div className={styles.input_area}>
                        <textarea className={styles.input} maxLength={500} value={description} onChange={(e) => {setDescription(e.target.value)}}></textarea>
                        <div className={styles.input_buttons}>
                            <button type='submit' className={styles.input_button} disabled={disabled} >수정</button>
                            <button onClick={() => {
                                setReply(false)
                            }} className={styles.input_button}>취소</button>
                        </div>
                    </div>
                </form>
            </>
        )
    } else {
        return (
        <div className={styles.container}>
            <div className={styles.comment_info}>
                <span className={styles.nick_name}>{data.nick_name}{data.admin ? <span className={styles.image}><Image src={checkIcon} width='16' height='16' /></span> : <></>}</span>
                <span className={styles.date}>{year}.{month}.{day} {hour <= 12 ? `오전 ${hour}` : `오후 ${hour-12}`}:{minute}:{second}</span>
                <p className={styles.description}>{data.description}</p>            
            </div>
            {userInfo.isAdmin || userInfo.id === data.user_id ?
                <div className={styles.buttons}>
                    <span onClick={() => {
                        setReply(true)
                    }} className={styles.button}>수정</span>
                    <span onClick={() => {
                        deleteSubmit()
                    }} className={styles.button}>삭제</span>
                </div>
                :
                <></>
            }
        </div>
        )
    }
}
