import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from '../style/PortfolioContent.module.css'

export const PortfolioContent = ({json}) => {
  const [userInfo, setUserInfo] = useState({})
  const [click, setClick] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (json.cookies.accessToken) {
      setUserInfo(jwtDecode(json.cookies.accessToken))
    }
  }, [])

  const onDelete = () => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/${json.route}/${userInfo.id}`,
    {
      data : {
        url : json.val.url
      },
      headers:{
        'Content-type': 'application/json',
        'Accept': 'application/json',

        'token': `Bearer ${json.cookies.accessToken}`
      }
    })
    .then((res) => {
        alert('삭제되었습니다.')
        router.reload()
    })
    .catch((err) => {
        alert('Error 404')
        router.back()
    })
  }

  return (
    <>
    <div className={styles.container}>
        <div className={styles.content} onClick={() => {setClick(click ? false : true)}}>
            <Image className={styles.image} src={json.val.url} alt={json.val.title} layout='fill' />
        </div>
    </div>
    <div className={click ? styles.click_container : styles.none}>
        <div className={click ? styles.click_content : styles.none} onClick={() => {setClick(click ? false : true)}}>
            <Image className={click ? styles.click_content : styles.none} src={json.val.url} alt={json.val.title} layout='fill' />
        </div>
        {userInfo.isAdmin ?
        <div className={styles.buttons}>
            <div className={styles.button} onClick={onDelete}>삭제</div>
        </div>
        :
        <></>}      
    </div>
    </>
  )
}

