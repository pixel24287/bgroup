import React from 'react'
import { useRouter } from 'next/router'
import { Header } from "../src/component/Header";
import { Topbar } from "../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import styles from '../styles/GuideButton.module.css'

export default function CreateProductList({cookies}) {
  const router = useRouter()

  //에디터 상태 관리 변수
  const [disabled, setDisabled] = useState(true)
  const [userId, setUserId] = useState('')

  const API_URL = 'http://localhost:5000'

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    if(cookies.accessToken) {
      setUserId(jwtDecode(cookies.accessToken).id)
    } else {
      alert('로그인을 하세요.')
      router.push('/login')
    }
  }, []);

  //라우터 값이 존재할 때
  useEffect(() => {
    if(router.asPath === '/createProductList') {
      setDisabled(false)
    }
  }, [router.asPath])


  //에디터 정보 전송
  const onSubmit = () => {
    if(data.length < 1 || title.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      axios.post(`${API_URL}/api/product/${userId}`,
      {
        title : title,
        descriptions : data,
        search_descriptions : str
      },{
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'token': `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('작성되었습니다.')
        router.back()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  //홈으로 이동
  const onCancel = () => {
    router.back()
  }

  return (
    <>
    <Topbar json = {{router :'question', cookies : cookies }} />
      <InputTitle 
      title={title}
      onChange={(data) => {
        setTitle(data)
      }} />
      <Editor
        name="description"
        onChange={(data) => {
          setData(data);
          setStr(data)
        }}
        editorLoaded={editorLoaded}
      />
      <div className={styles.body}>
        <button className={styles.button} disabled={disabled} onClick={onCancel} style={{backgroundColor:"gray"}}>취소</button>
        <button className={styles.button} disabled={disabled} onClick={onSubmit} style={{backgroundColor:"#1E00F2",}}>등록</button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}