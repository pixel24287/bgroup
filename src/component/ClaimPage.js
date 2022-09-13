import React from 'react'
import styles from '../style/ClaimPage.module.css'

export const ClaimPage = ({data}) => {
    return (
        <div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.td}>1. 상호(채널명)</td>
                        <td className={styles.td}>{data.trademark}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>2. 고객 이름, 주소, 연락처</td>
                        <td className={styles.td}>{data.user_information}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>3. 발주날짜</td>
                        <td className={styles.td}>{data.order_date}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>4. 운송장번호</td>
                        <td className={styles.td}>{data.transport_document_number}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>5. 주문상품</td>
                        <td className={styles.td}>{data.product}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>6. 클레임내용</td>
                        <td className={styles.td}>{data.claim_description}</td>
                    </tr>
                    <tr>
                        <td className={styles.td}>7. 처리방법(환불, 재발송등)</td>
                        <td className={styles.td}>{data.processing_method}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
