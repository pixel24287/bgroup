import React, { useState } from 'react'
import styles from '../style/BusinessAprovalForm.module.css'

export const BusinessApprovalForm = ({nickName, setNickName, name, setName, password, setPassword, email, setEmail, phoneNumber, setPhoneNumber, keySalesChannel, setKeySalesChannel}) => {
  return (
    <>
        <form className={styles.form}>
            <div className={styles.input_area}>
                <p>닉네임</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='닉네임' value={nickName} onChange={(e) => setNickName(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>이름</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='이름' value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>비밀번호</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>이메일</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='이메일' value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>전화번호</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='전화번호' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>주요 판매 채널</p>
                <textarea type='text' maxLength={5000} className={styles.input} placeholder='주요 판매 채널' value={keySalesChannel} onChange={(e) => setKeySalesChannel(e.target.value)}></textarea>
            </div>
            <div className={styles.input_area}>
                <p>사업자등록증</p>
                <input type='text' className={styles.text_input} value={'본문에 파일첨부 기능을 이용해 사업자등록증을 첨부해 주세요.'} readOnly={true} ></input>
            </div>
        </form>
    </>
  )
}
