import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from '../style/Header.module.css'
import jwtDecode from 'jwt-decode'

export const Header = ({json}) => {
  const [userInfo, setUserInfo] = useState({})
  const [router, setRouter] = useState(json.router)
  const [buttonSubmit, setButtonSubmit] = useState(false)
  useEffect(() => {
    setRouter(router.toLowerCase())
    if (json.cookies.accessToken) {
      setUserInfo(jwtDecode(json.cookies.accessToken))
    }
  }, [])

  useEffect(() => {
    if(json.router === 'Notice' && userInfo.isAdmin) {
      setButtonSubmit(true)
    }
    else if(json.router === 'Question' && userInfo.id) {
      setButtonSubmit(true)
    }
  }, [userInfo])

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{json.title}</h1>
        <div>
          {buttonSubmit ?
          <>
            <Link href={`/create${json.router}`}>
              <a className={styles.AdminButton} >쓰기</a>
            </Link>
          </>
          :
          <>
            <Link href={`/${router}`}>
              <a className={styles.button}>쓰기</a>
            </Link>
          </>}
            <Link href='/'>
              <a className={styles.button}>게시판 검색</a>
            </Link>
        </div>
    </div>
  )
}
