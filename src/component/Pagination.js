import axios from 'axios'
import React ,{ useEffect, useState } from 'react'

import Image from 'next/image'

import arrow_right from '../icons/keyboard_arrow_right.svg'
import arrow_left from '../icons/keyboard_arrow_left.svg'

import double_arrow_right from '../icons/keyboard_double_arrow_right.svg'
import double_arrow_left from '../icons/keyboard_double_arrow_left.svg'

import styles from '../style/Pagination.module.css'

export const Pagination = ({pageNumber, setPageNumber, router}) => {
    const [pages, setPages] = useState([])
    const [totalPageGroup, setTotalPageGroup] = useState(0)
    const API_URL = 'http://localhost:5000'

    useEffect(async () => {
        const { data } = await axios.get(`${API_URL}/api/${router}/total_page`)

        let totalPage = data;
        let pageGroup = Math.ceil(totalPage / 10);
        setTotalPageGroup(pageGroup)
        let currentPageGroup = Math.ceil(pageNumber / 10)
        let last = currentPageGroup * 10 > pageGroup ? pageGroup : currentPageGroup * 10;
        let first = currentPageGroup * 10 > pageGroup ? (currentPageGroup * 10) - 9 : last - 9;
    
        let allPages = []
        for(let i = first; i <= last; i++) {
          allPages.push(i)
        }
        setPages(allPages)
      }, [pageNumber])

    return (
        <div className={styles.container}>
            <div className={styles.arrow_area}>
                <div className={styles.arrow_button} onClick={() => {setPageNumber(1)}}>
                    <Image src={double_arrow_left} layout='fill' />
                </div>
                <div className={styles.arrow_button} onClick={() => {1 > pageNumber - 1 ? setPageNumber(1) : setPageNumber(pageNumber - 1)}}>
                    <Image src={arrow_left} layout='fill' />
                </div>
            </div>

            <div className={styles.number_area}>
                {pages.length < 1 ?
                <p className={styles.number}>1</p>
                : 
                pages.map((val, index) => (
                    <p className={styles.number} key={index} onClick={() => {setPageNumber(val)}} style={{color: pageNumber === val ? 'black' : 'gray', fontWeight: pageNumber === val ? `bold` : 'normal'}}>{val}</p>
                ))}
            </div>

            <div className={styles.arrow_area}>
                <div className={styles.arrow_button} onClick={() => {totalPageGroup < 1 ? setTotalPageGroup(0) : totalPageGroup < pageNumber + 1 ? setPageNumber(totalPageGroup) : setPageNumber(pageNumber + 1)}}>
                    <Image src={arrow_right} layout='fill' />
                </div>
                <div className={styles.arrow_button} onClick={() => {totalPageGroup < 1 ? setTotalPageGroup(0) : setPageNumber(totalPageGroup)}}>
                    <Image src={double_arrow_right} layout='fill' />
                </div> 
            </div>
        </div>
    )
}
