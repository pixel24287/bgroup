import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import styles from '../style/InputTitle.module.css'

export const InputProduct = ({cookies}) => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const API_URL = 'http://localhost:5000'

  useEffect(() => {
    if (cookies.accessToken) {
      setUserInfo(jwtDecode(cookies.accessToken))
    }
  }, [])


  const onSubmit = () => {
    axios.post(`${API_URL}/api/product/create/list/${userInfo.id}`,
    {
      title : title
    },{
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json',
  
        'token': `Bearer ${cookies.accessToken}`
      }
    })
    .then((res) => {
      alert('추가되었습니다.')
      router.reload()
    })
    .catch((err) => {
      alert('Error 404')
      router.reload()
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.input_area}>
        <p className={styles.text}>리스트 이름</p>
        <input type='text' maxLength={10} className={styles.text_input} placeholder='리스트 이름' value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <button className={styles.button} onClick={onSubmit}>등록</button>
      </div>
    </div>
  )
}
