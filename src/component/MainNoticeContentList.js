import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from '../style/MainNoticeContentList.module.css'
import { MainNoticeContent } from './MainNoticeContent'
import { CheckAdminPagination } from './CheckAdminPagination'

export const MainNoticeContentList = ({cookies, main, admin_page}) => {
  const [contents, setContents] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  //데이터 불러오기
  useEffect(async () => {
    if (main) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/main/list`)
      setContents(data)
    } else {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/notice/not/main/list/${pageNumber - 1}`)
      setContents(data)
    }
  }, [pageNumber])

    return (
      <div className={styles.container}>
        <div className={styles.contents}>
        {contents.length < 1 ?
        <></>
          :
          <>
          {contents.map((val, index) => (
            <MainNoticeContent key={index} json = {{val : val, cookies : cookies, index : index, main : main, admin_page : admin_page}}/>
          ))}
          </>}
          {!main && admin_page ?
            <CheckAdminPagination pageNumber={pageNumber} setPageNumber={setPageNumber} router={'notice'} />
            :
            <></>
          }
        </div>
      </div>
    )
}
