import React, { useState } from 'react'
import styles from '../style/InputForm.module.css'

export const ClaimForm = ({name, setName, password, setPassword, trademark, setTrademark, userInformation, setUserInformation, orderDate, setOrderDate, transportDocumentNumber, setTransportDocumentNumber, product, setProduct, claimDescription, setClaimDescription, processingMethod, setProcessingMethod}) => {
  return (
    <>
        <form className={styles.form}>
            <div className={styles.input_area}>
                <p>닉네임</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='닉네임' value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>비밀번호</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>상호(채널명)</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='상호(채널명)' value={trademark} onChange={(e) => setTrademark(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>고객 이름, 주소, 연락처</p>
                <textarea type='text' maxLength={5000} className={styles.input} placeholder='고객 이름, 주소, 연락처' value={userInformation} onChange={(e) => setUserInformation(e.target.value)}></textarea>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>발주날짜</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='발주날짜' value={orderDate} onChange={(e) => setOrderDate(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>운송장번호</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='운송장번호' value={transportDocumentNumber} onChange={(e) => setTransportDocumentNumber(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>주문상품</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='주문상품' value={product} onChange={(e) => setProduct(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>클레임내용</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='클레임내용' value={claimDescription} onChange={(e) => setClaimDescription(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p className={styles.text}>처리방법(환불/재발송등)</p>
                <input type='text' maxLength={100} className={styles.text_input} placeholder='처리방법(환불/재발송등)' value={processingMethod} onChange={(e) => setProcessingMethod(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>사진첨부</p>
                <input type='text' className={styles.text_input} value={'본문에 파일첨부 기능을 이용해 사진을 첨부해 주세요.'} readOnly={true} ></input>
            </div>
        </form>
    </>
  )
}
