import React from 'react'
import styles from '../style/Footer.module.css'

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text_area}>
        <p className={styles.text}>전라북도 군산시 풍전3길 37-1 (주) 비그룹 | 대표자 : 양정훈</p>
        <p className={styles.text}>사업자등록번호 : 677-81-01297 | 통신판매업신고번호 : 제 2019-전북군산-00172 호 | 전화 : 063-442-7616</p>
      </div>
    </div>
  )
}
