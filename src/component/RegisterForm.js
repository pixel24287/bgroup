import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import styles from '../style/RegisterForm.module.css'

export const RegisterForm = () => {
    const router = useRouter()
    //리액트 훅으로 각 상태 관리
    const [userId, setUserId] = useState('')
    const [userPw, setUserPw] = useState('')
    const [checkUserPw, setCheckUserPw] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userEmail2, setUserEmail2] = useState('')
    const [userNickname, setUserNickname] = useState('')
    const [checkId, setCheckId] = useState(false)
    const [checkEmail, setCheckEmail] = useState(false)
    const [checkSubmit, setCheckSubmit] = useState(false)


    //연속클릭 차단 딜레이 훅
    const [disabled, setDisabled] = useState(false);

    const API_URL = 'http://localhost:5000'
    const REGISTER_ENDPOINT = 'api/auth/register'
    const CHECK_USER_ID = 'api/auth/check/user_id'
    const CHECK_USER_EMAIL = 'api/auth/check/email'

    const handleSubmit = async (e) => {
        setDisabled(true);
        //새로고침 할 필요 없어서 디폴트 값으로 고정
        e.preventDefault();
        //딜레이 추가
        await new Promise((resolve) => setTimeout(resolve, 1000))
        //특정 조건으로 막기 가능
        if (checkSubmit) {

        } else if(userId.length < 1) {
            alert('아이디를 입력해주세요.')
        } else if (userPw.length < 1) {
            alert('비밀번호를 입력해주세요.')
        } else if (userEmail.length < 1) {
            alert('이메일을 입력해주세요.')
        } else if (userEmail2.length < 1) {
            alert('부 이메일을 입력해주세요.')
        } else if (userNickname.length < 1) {
            alert('닉네임을 입력해주세요.')
        } else if(!checkId) {
            alert('아이디 중복 확인을 하세요')
        } else if(!checkEmail) {
            alert('이메일 중복 확인을 하세요')
        } else if(checkUserPw !== userPw || checkUserPw.length < 1) {
            alert('비밀번호 확인을 진행해주세요')
        } else {
            //axios 로 비동기 처리 보내기
            axios.post(`${API_URL}/${REGISTER_ENDPOINT}`,
            {
                user_id : userId,
                user_pw : userPw,
                email : userEmail,
                email2 : userEmail2,
                nick_name : userNickname
            },{
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(async (res) => {
                //회원가입 성공시 알림 후 이동
                alert('회원가입 성공!')
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            })
            .catch((err) => {
                alert('회원가입 실패')
                console.log(err);
            })
        }
        setDisabled(false);
    }

    const checkUserId = async (e) => {
        setCheckSubmit(true)
        if(userId.length < 1) {
            alert('아이디를 입력해주세요.')
        } else {
            //axios 로 비동기 처리 보내기
            axios.post(`${API_URL}/${CHECK_USER_ID}`,
            {
                user_id : userId
            },{
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(async (res) => {
                //회원가입 성공시 알림 후 이동
                alert('중복없음 사용가능 id')
                setCheckId(true)
            })
            .catch((err) => {
                alert('중복된 id')
                console.log(err);
            })
        }
        setTimeout(() => {
            setCheckSubmit(false)
        }, 1000)
    }
    const checkUserEmail = () => {
        setCheckSubmit(true)
        if(userEmail.length < 1) {
            alert('이메일을 입력해주세요.')
        } else {
            //axios 로 비동기 처리 보내기
            axios.post(`${API_URL}/${CHECK_USER_EMAIL}`,
            {
                email : userEmail
            },{
                headers:{
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            .then(async (res) => {
                //회원가입 성공시 알림 후 이동
                alert('중복없음 사용가능 email')
                setCheckEmail(true)
            })
            .catch((err) => {
                alert('중복된 email')
                console.log(err);
            })
        }
        setTimeout(() => {
            setCheckSubmit(false)
        }, 1000)
    }

  return (
    <>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.title}>계정 만들기</div>
            <div className={styles.input_area}>
                <p className={styles.text}>아이디</p>
                <input type='text' maxLength={45} className={styles.pw_text_input} placeholder='로그인 아이디' value={userId} style={{backgroundColor: checkId ? '#0080ff' : 'white'}} onChange={(e) => {
                    setUserId(e.target.value)
                    setCheckId(false)
                    }}></input>
            </div>
            <button onClick={checkUserId} className={styles.button}>id 중복 확인</button>
            <div className={styles.input_area}>
                <p className={styles.text}>비밀번호</p>
                <input type='password' maxLength={45} className={styles.text_input} placeholder='로그인 비밀번호' value={userPw} onChange={(e) => setUserPw(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>비밀번호 확인</p>
                <input type='password' maxLength={45} className={styles.pw_text_input} placeholder='비밀번호 확인' value={checkUserPw} onChange={(e) => setCheckUserPw(e.target.value)} style={{backgroundColor: checkUserPw === userPw ? '#0080ff' : checkUserPw.length < 1 ? 'white' : '#ff5232'}}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>이메일</p>
                <input type='email' maxLength={100} className={styles.pw_text_input} placeholder='이메일' value={userEmail} style={{backgroundColor: checkEmail ? '#0080ff' : 'white'}} onChange={(e) => {
                    setUserEmail(e.target.value)
                    setCheckEmail(false)
                }}></input>
            </div>
            <button onClick={checkUserEmail} className={styles.button}>email 중복 확인</button>
            <div className={styles.input_area}>
                <p className={styles.text}>부 이메일</p>
                <input type='email' maxLength={100} className={styles.text_input} placeholder='부 이메일' value={userEmail2} onChange={(e) => setUserEmail2(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>닉네임</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='닉네임' value={userNickname} onChange={(e) => setUserNickname(e.target.value)}></input>
            </div>

            <button type='submit' className={styles.button} disabled={disabled} >회원가입</button>
        </form>
    </>
  )
}
