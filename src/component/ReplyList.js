import React from 'react'
import { Reply } from './Reply'

import styles from '../style/ReplyList.module.css'

export const ReplyList = ({reply, cookies, route}) => {
  return (
    <div className={styles.body}>
      {reply.map((val, index) => (
        <Reply key={index} data={val} cookies={cookies} route={route} />
      ))}    
    </div>
  )
}
