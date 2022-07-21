import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

import styles from '../style/WriteReply.module.css'

export const WriteReply = ({json}) => {
    const router = useRouter()
    //리액트 훅으로 각 상태 관리
    const [comment, setComment] = useState('')
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if(json.cookies.accessToken) {
            setUserInfo(jwtDecode(json.cookies.accessToken))
        }
    }, [])

    //연속클릭 차단 딜레이 훅
    const [disabled, setDisabled] = useState(false);

    const API_URL = 'http://localhost:5000'
    const UPLOAD_ENDPOINT = '_comment'

    const handleSubmit = async (e) => {
        setDisabled(true);
        //새로고침 할 필요 없어서 디폴트 값으로 고정
        e.preventDefault();
        //딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000))
        //특정 조건으로 막기 가능
        if(!json.cookies.accessToken) {
            alert('로그인을 하세요.')
        } else if (comment.length < 1) {
            alert('답댓글을 입력해주세요.')
        } else {
            //axios 로 비동기 처리 보내기
            axios.post(`${API_URL}/api/${json.router}${UPLOAD_ENDPOINT}/reply/${userInfo.id}`,
            {
                comment_id : json.comment_id,
                descriptions : comment
            },{
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',

                    'token': `Bearer ${json.cookies.accessToken}`
                }
            })
            .then(async (res) => {
                setComment('')
                alert('답댓글 작성 완료')
                router.reload()
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert('유효하지 않은 요청입니다.')
                } else {
                    alert('error 발생')
                }
            })
        }
        setDisabled(false);
    }

  return (
    <div className={styles.container}>
    {userInfo ?
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input_area}>
                <textarea className={styles.input} placeholder='답댓글' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                <div className={styles.input_buttons}>
                    <button type='submit' className={styles.button} disabled={disabled} >등록</button>
                    <button className={styles.button} onClick={() => {json.setReply(false)}} >취소</button>
                </div>
                </div>
            </form>
        </>
        :
        <>
        </>}
    </div>
  )
}
