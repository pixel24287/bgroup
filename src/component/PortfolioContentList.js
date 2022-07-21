import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

import styles from '../style/ContentList.module.css'
import { ProductContent } from './ProductContent'
import { Pagination } from './Pagination'
import { PortfolioContent } from './PortfolioContent'
import { PortfolioPagination } from './PortfolioPagination'

export const PortfolioContentList = ({cookies, router}) => {
  const API_URL = 'http://localhost:5000'
  const [pageNumber, setPageNumber] = useState(1)
  const [contents, setContents] = useState([])

//데이터 불러오기
useEffect(async () => {
    try {
        const { data } = await axios.get(`${API_URL}/api/${router}/list/${pageNumber - 1}`)
        setContents(data)
    } catch {
        alert('Error 404')
    }
    }, [pageNumber])

    return (
      <div className={styles.container}>
            {router === 'portfolio' ?
            <Link href={`/createPortfolio`}>
                <a className={styles.button}>쓰기</a>
            </Link>
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
