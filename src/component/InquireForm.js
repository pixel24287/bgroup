import React, { useState } from 'react'
import styles from '../style/InputForm.module.css'

export const InquireForm = ({name, setName, password, setPassword}) => {
  return (
    <>
        <form className={styles.form}>
            <div className={styles.input_area}>
                <p>닉네임</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='이름' value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className={styles.input_area}>
                <p>비밀번호</p>
                <input type='text' maxLength={45} className={styles.text_input} placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
        </form>
    </>
  )
}
