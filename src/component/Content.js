import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

import Image from 'next/image'

import checkIcon from '../icons/check.svg'

import styles from '../style/Content.module.css'

export const Content = ({json}) => {
  const year = new Date(json.val.created_at).getFullYear()
  const month = ('0' + (new Date(json.val.created_at).getMonth() + 1)).slice(-2);
  const day = ('0' + new Date(json.val.created_at).getDate()).slice(-2);

  return (
    <div className={styles.container}>
      <Link href={`/${json.router}View/${json.val.id}`}>
        <a className={styles.content}>
          <p className={styles.number}>{json.pageNumber - 1 < 1 ? json.index + 1 : (json.pageNumber - 1) * 10 + (json.index + 1)}</p>
          <div className={styles.title}>{json.val.title}{json.val.admin_inquiry ? <div className={styles.image}><Image src={checkIcon} width='16' height='16' /></div> : <></>}</div>
          <div className={styles.nick_name}>{json.val.nick_name}</div>
          <div className={styles.date}>{year}.{month}.{day}</div>
        </a>
      </Link>
    </div>
  )
}
