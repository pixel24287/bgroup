import React, { useState } from 'react'
import styles from '../style/InputTitle.module.css'

export const InputTitle = ({title, onChange}) => {
  return (
    <div className={styles.container}>
      <div className={styles.input_area}>
        <p className={styles.text}>제목</p>
        <input type='text' maxLength={100} className={styles.text_input} placeholder='제목' value={title} onChange={(e) => onChange(e.target.value)}></input>
      </div>
    </div>
  )
}
