import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import styles from '../style/ProductContent.module.css'
import { useRouter } from 'next/router'

export const ProductContent = ({json}) => {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState({})
    const [click, setClick] = useState(false)
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (json.cookies.accessToken) {
        setUserInfo(jwtDecode(json.cookies.accessToken))
        }
        setDescription(json.val.title)
    }, [])

    const updateSubmit = async () => {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/product/list/${userInfo.id}`,
        {
            description : description,
            postId : json.val.id
        },{
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json',

                'token': `Bearer ${json.cookies.accessToken}`
            }
        })
        .then((res) => {
        alert('상시상품 리스트 업데이트 성공')
        router.reload()
        })
        .catch((err) => {
        alert('Error 404')
        })
    }

  const deleteSubmit = async () => {
    let checkDelete1 = confirm('삭제하시겠습니까? \n삭제하시면 해당 리스트의 모든 계시물들이 비활성화됩니다.')
    if(checkDelete1) {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/product/list/${userInfo.id}`,
        {
            data : {
                postId : json.val.id
            },
            headers:{
                'Content-type': 'application/json',
                'Accept': 'application/json',
        
                'token': `Bearer ${json.cookies.accessToken}`
            }
        })
        .then((res) => {
            alert('상시상품 리스트 삭제 성공')
            router.reload()
        })
        .catch((err) => {
            alert('Error 404')
            console.log(err)
        })
    }
  }
  const restoreSubmit = async () => {
    let checkDelete1 = confirm('복구겠습니까? \n복구하시면 해당 리스트의 모든 계시물들이 활성화됩니다.')
    if(checkDelete1) {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/product/restore/list/${userInfo.id}`,
        {
            postId : json.val.id
        },{
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json',

            'token': `Bearer ${json.cookies.accessToken}`
        }
        })
        .then((res) => {
            alert('상시상품 리스트 복구 성공')
            router.reload()
        })
        .catch((err) => {
            alert('Error 404')
        })
    }
  }


  return (
    <div className={styles.container} style={{backgroundColor : click ? 'rgb(240, 240, 240)' : 'white'}}>
        {click ?
        <div className={styles.content}>
            <input className={styles.input} maxLength='10' value={description} onChange={(e) => {setDescription(e.target.value)}} />
            <div className={styles.buttons}>
                <p className={styles.update_button} onClick={updateSubmit}>등록</p>
                <p className={styles.delete_button} onClick={() => {click ? setClick(false) : setClick(true)}}>취소</p>
            </div>
        </div>
        :
        <div className={styles.content}>
            <p className={styles.number}>{json.index + 1}</p>
            <p className={styles.title}>{json.val.title}</p>
            <div className={styles.buttons}>
                {json.main ?
                <>
                    <p className={styles.update_button} onClick={() => {click ? setClick(false) : setClick(true)}}>수정</p>
                    <p className={styles.delete_button} onClick={deleteSubmit}>삭제</p>
                </>
                :
                <>
                    <p className={styles.create_button} onClick={restoreSubmit}>복구</p>
                </>}
            </div>
        </div>}
    </div>
  )
}
