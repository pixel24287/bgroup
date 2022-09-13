import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

import jwtDecode from 'jwt-decode'

import styles from '../style/ContentList.module.css'
import { ProductContent } from './ProductContent'
import { Pagination } from './Pagination'
import { PortfolioContent } from './PortfolioContent'
import { PortfolioPagination } from './PortfolioPagination'

export const PortfolioContentList = ({cookies, router}) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [contents, setContents] = useState([])
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if(cookies.accessToken) {
        setUserInfo(jwtDecode(cookies.accessToken))
    }
  }, [cookies.accessToken]);

    //데이터 불러오기
    useEffect(async () => {
    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${router}/list/${pageNumber - 1}`)
        setContents(data)
    } catch {
        alert('Error 404')
    }
    }, [pageNumber])

    return (
      <div className={styles.container}>
            {router === 'portfolio' ?
                userInfo.isAdmin ?
                <Link href={`/createPortfolio`}>
                    <a className={styles.button}>쓰기</a>
                </Link>
                :
                <>
                    <p className={styles.buttons}>쓰기</p>
                </>
            :
            <></>}
            <div className={styles.image_container}>
                {contents.map((val, index) => (
                    <PortfolioContent key={index} json = {{val : val, cookies : cookies, index : index, route : router}}/>
                ))}
            </div>
            <div className={styles.contents}>
                <PortfolioPagination pageNumber={pageNumber} setPageNumber={setPageNumber} router={router} />
            </div>
      </div>
    )
}
