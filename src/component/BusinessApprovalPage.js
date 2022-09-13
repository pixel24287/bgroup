import React from 'react'
import styles from '../style/BusinessApprovalPage.module.css'

export const BusinessApprovalPage = ({data}) => {
    return (
        <div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.td}>1. 이름</td>
                        <td className={styles.td}>{data.name}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>2. 연락처</td>
                        <td className={styles.td}>{data.phone_number}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>3. 이메일</td>
                        <td className={styles.td}>{data.email}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>4. 주요판매채널</td>
                        <td className={styles.td}>{data.key_sales_channel}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>5. 사업자등록증</td>
                        <td className={styles.td}>본문에 파일첨부 기능을 이용해 사업자등록증을 첨부해 주세요.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
