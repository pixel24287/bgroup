import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from '../style/ContentList.module.css'
import { Content } from './Content'
import { Pagination } from './Pagination'
import { SearchPagination } from './SearchPagination'
import { MainNoticeContentList } from './MainNoticeContentList'

export const ContentList = (props) => {
  const API_URL = 'http://localhost:5000'
  const [contents, setContents] = useState([])
  const [searchContents, setSearchContents] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const [checkRouter, setCheckRouter] = useState()

  //데이터 불러오기
  useEffect(async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/${props.router}/list/${pageNumber - 1}`)
      setContents(data)
    } catch {
      alert('Error 404')
    }

  }, [pageNumber])


  useEffect(() => {
    setSearchContents(props.data)
  }, [props.data])

      
  useEffect(() => {
    if (props.router === 'business_approval') {
      setCheckRouter('businessApproval')
    }
    else if (props.router === 'order_registration') {
      setCheckRouter('orderRegistration')
    }
    else {
      setCheckRouter(props.router)
    }
    setPageNumber(1)
  }, [props.router])

    return (
      <div className={styles.container}>
        <div className={styles.area}>
          <p className={styles.number}>번호</p>
          <p className={styles.title}>제목</p>
          <p className={styles.nick_name}>글쓴이</p>
          <p className={styles.date}>날짜</p>
        </div>
        <div className={styles.contents}>
          <MainNoticeContentList cookies={props.cookies} main={true} admin_page={false} />
          {props.send ?
            searchContents[0] ?
            <>
              {searchContents.map((val, index) => (
                <Content key={index} json = {{val : val, router : checkRouter , cookies : props.cookies, pageNumber : pageNumber, index : index}}/>
              ))}
              <SearchPagination pageNumber={props.searchPageNumber} setPageNumber={props.setSearchPageNumber} count={props.count} router={props.router} />
            </>
            :
            <div className={styles.container}>
              <p style={{fontSize:'1.2rem'}}>검색결과 없음</p>
            </div>        
          :
            <>
              {contents.map((val, index) => (
                <Content key={index} json = {{val : val, router : checkRouter , cookies : props.cookies, pageNumber : pageNumber, index : index}}/>
              ))}
              <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} router={props.router} />
            </>
          }
        </div>
      </div>
    )
}
