import React, { useState, useEffect } from 'react'
import styles from '../style/InputForm.module.css'
import {useRouter} from 'next/router'
import axios from 'axios'

export const PasswordForm = ({cookies, userInfo ,postId, route , password ,setPassword , setIsLogin, setData}) => {
  const router = useRouter()
  const [disabled, setDisabled] = useState(false)

  const API_URL = 'http://localhost:5000'

  useEffect(() => {
    if(userInfo.isAdmin) {
      axios.get(`${API_URL}/api/${route}/${userInfo.id}/${postId}/password`,
      {
        headers: {
          token: `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('관리자님 환영합니다.');
        setData(res.data);
        setIsLogin(true);
      })
      .catch((err) => {
        alert('Error 404');
        router.reload()
      })
    }
  }, [userInfo])

  //에디터 정보 전송
  const onSubmit = (e) => {
    setDisabled(true);
    e.preventDefault();
    if(password.length < 1) {
      alert('비밀번호을 작성해주세요!')
    } else {
      axios.get(`${API_URL}/api/${route}/${userInfo.id ? userInfo.id : 0}/${postId}/${password}`,
      {
        headers: {
          token: `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('비밀번호가 일치합니다.');
        setData(res.data);
        setIsLogin(true);
      })
      .catch((err) => {
        alert('비밀번호가 일치하지 않습니다.');
        router.reload()
      })
    }
    setDisabled(false);
  }
  return (
    <>
        <form className={styles.form} onSubmit={onSubmit}>
          <p className={styles.text}>비밀글 기능으로 보호된 글입니다.</p>
          <input type='text' maxLength={45} className={styles.text_input} placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <button type='submit' className={styles.button} disabled={disabled} >로그인</button>
        </form>
    </>
  )
}
