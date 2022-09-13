import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import styles from '../style/AuthForm.module.css'

export const AuthForm = () => {
    const router = useRouter()
    //리액트 훅으로 각 상태 관리
    const [userId, setUserId] = useState('')
    const [userPw, setUserPw] = useState('')

    //연속클릭 차단 딜레이 훅
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = async (e) => {
        setDisabled(true);
        //새로고침 할 필요 없어서 디폴트 값으로 고정
        e.preventDefault();
        //딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000))
        //특정 조건으로 막기 가능
        if(userId.length < 1) {
            alert('아이디를 입력해주세요.')
        } else if (userPw.length < 1) {
            alert('비밀번호를 입력해주세요.')
        } else {
            //axios 로 비동기 처리 보내기
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
                user_id : userId,
                user_pw : userPw,
            },{
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(async (res) => {
                //next 내부 api로 cookie에 refresh token 저장
                await axios.post(`api/refresh_login`,
                res.data.refreshToken
                ,{
                    headers:{
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                //next 내부 api로 cookie에 access token 저장
                await axios.post(`api/access_login`,
                res.data.accessToken
                ,{
                    headers:{
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
                .then((res) => {
                    router.back()
                })
                .catch((err) => {
                    alert('error 404')
                    console.log(err);
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    alert('잘못된 아이디나 비밀번호입니다.')
                } else {
                    alert('error 발생')
                }
            })
        }
        setDisabled(false);
    }

  return (
    <div className={styles.body}>
        <h1>비그룹</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type='text' maxLength={45} className={styles.text_input} placeholder='아이디' value={userId} onChange={(e) => setUserId(e.target.value)}></input>
            <input type='password' maxLength={45} className={styles.text_input} placeholder='비밀번호' value={userPw} onChange={(e) => setUserPw(e.target.value)}></input>
            <button type='submit' className={styles.button} disabled={disabled} >로그인</button>
        </form>
        <div className={styles.button_area}>
            <Link href='/register'>
                <a>회원가입</a>
            </Link>
        </div>
    </div>
  )
}
