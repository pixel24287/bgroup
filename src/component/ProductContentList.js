import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from '../style/ContentList.module.css'
import { ProductContent } from './ProductContent'

export const ProductContentList = ({cookies, main}) => {
  const [contents, setContents] = useState([])

  //데이터 불러오기
  useEffect(async () => {
    if (main) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/data_list`)
      setContents(data)
    } else {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/delete/data_list`)
      setContents(data)      
    }

  }, [])

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
            <ProductContent key={index} json = {{val : val, cookies : cookies, index : index, main : main}}/>
          ))}
          </>}
        </div>
      </div>
    )
}
