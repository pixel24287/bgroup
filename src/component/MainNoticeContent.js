import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import styles from '../style/NoticeContent.module.css'
import { useRouter } from 'next/router'

export const MainNoticeContent = ({json}) => {
  const router = useRouter();

  const year = new Date(json.val.created_at).getFullYear()
  const month = ('0' + (new Date(json.val.created_at).getMonth() + 1)).slice(-2);
  const day = ('0' + new Date(json.val.created_at).getDate()).slice(-2);
  const API_URL = 'http://localhost:5000'

  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    if (json.cookies.accessToken) {
      setUserInfo(jwtDecode(json.cookies.accessToken))
    }
  }, [])

  const createSubmit = async () => {
    axios.post(`${API_URL}/api/notice/main/${userInfo.id}`,
    {
      id : json.val.id,
    },{
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json',

        'token': `Bearer ${json.cookies.accessToken}`
      }
    })
    .then((res) => {
      alert('메인 공지사항 추가 성공')
      router.reload()
    })
    .catch((err) => {
      alert('error 발생')
    })
  }

  const deleteSubmit = async () => {
    axios.put(`${API_URL}/api/notice/main/${userInfo.id}/${json.val.id}`,
    {
    },{
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json',

        'token': `Bearer ${json.cookies.accessToken}`
      }
    })
    .then((res) => {
        alert('메인 공지사항 삭제 성공')
        router.reload()
    })
    .catch((err) => {
      alert('error 발생')
    })
  }

  return (
    <div className={styles.container}>
      <Link href={`/noticeView/${json.val.id}`}>
        <a className={styles.content}>
          <p className={styles.number}>{json.index + 1}</p>
          <p className={styles.title}>{json.val.title}</p>
          <div className={styles.nick_name}>{json.val.nick_name}</div>
          <div className={styles.date}>{year}.{month}.{day}</div>
        </a>
      </Link>
      {json.admin_page && json.main ? 
      <p className={styles.delete_button} onClick={deleteSubmit}>삭제</p>
      :
      <></>}
      {json.admin_page && !json.main ? 
      <p className={styles.create_button} onClick={createSubmit}>추가</p>
      :
      <></>}
    </div>
  )
}
