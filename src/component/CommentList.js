import React from 'react'
import { Comment } from './Comment'

import styles from '../style/CommentList.module.css'

export const CommentList = ({comment, cookies, router}) => {
    let allCount = comment.length;
    comment.map((val, index) => {
        if (val.reply) allCount += val.reply.length
    })
    return (
        <div className={styles.body}>
            <p className={styles.comment}>댓글 {allCount}</p>
            {comment.map((val, index) => (
                <Comment key={index} data = {val} cookies = {cookies} route={router} />
            ))}
        </div>
    )
}
