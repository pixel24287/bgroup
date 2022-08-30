import React, { useState, useEffect } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import Link from 'next/link'

import styles from '../style/ContentList.module.css'
import { CheckAdminContent } from './CheckAdminContent'
import { UserPagination } from './UserPagination'

export const UserContentList = ({cookies, check, router}) => {
  const [contents, setContents] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [checkRouter, setCheckRouter] = useState()
  const [nickName, setnickName] = useState({})

  useEffect(() => {
    if (cookies.accessToken) {
      setnickName(jwtDecode(cookies.accessToken).nick_name)
    }
  }, [])

  //데이터 불러오기
  useEffect(async () => {
    if (check) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${router}/check_user/${pageNumber - 1}/${nickName}`)
      setContents(data)
    } else {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${router}/no/check_user/${nickName}`)
      setContents(data)
    }
  }, [pageNumber, nickName])

  useEffect(() => {
  if (router === 'business_approval') {
    setCheckRouter('businessApproval')
  }
  else if (router === 'order_registration') {
    setCheckRouter('orderRegistration')
  }
  else if (router === 'claim') {
    setCheckRouter(router)
  }
  else if (router === 'inquire') {
    setCheckRouter(router)
  }
  setPageNumber(1)
}, [router])

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {contents.length < 1 ?
        <div className={styles.container}>
          <p style={{fontSize:'1.2rem'}}>검색결과 없음</p>
        </div>
        :
        <>
        {contents.map((val, index) => (
          <CheckAdminContent key={index} json = {{val : val, cookies : cookies, index : index, check : check, router : checkRouter}}/>
        ))}
        </>}
        {check ?
          <UserPagination pageNumber={pageNumber} setPageNumber={setPageNumber} router={router} nick_name={nickName}/>
          :
          <></>
        }
      </div>
    </div>
  )
}
