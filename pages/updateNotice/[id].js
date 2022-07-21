import React from 'react'
import { useRouter } from 'next/router'
import { Header } from "../../src/component/Header";
import { Topbar } from "../../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { InputTitle } from '../../src/component/InputTitle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { Editor } from '../../src/component/Editor';

import styles from '../../styles/GuideButton.module.css'

export default function UpdateNotice({getData, cookies}) {

  const router = useRouter()
  //에디터 상태 관리 변수
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState('')
  const [datas, setDatas] = useState('');
  const [str, setStr] = useState("")

  const API_URL = 'http://localhost:5000'
  const UPLOAD_ENDPOINT = 'api/notice'
  const [userInfo, setUserInfo] = useState({})

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    if(cookies.accessToken) {
      setUserInfo(jwtDecode(cookies.accessToken))
      setTitle(getData.title)
      setDatas(getData.descriptions)
      setStr(getData.descriptions)
      setEditorLoaded(true);
    } else {
      alert('로그인을 하세요.')
      router.push('/login')
    }
  }, [cookies.accessToken]);

  useEffect(() => {
    if (str !== undefined && str !== null && str !=='') {
      setStr(str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, ""))
      setStr(str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ""))
      let element = document.createElement('div')
      element.innerHTML = str;
      setStr(element.textContent)
      element.textContent = ''
    }
  }, [str])

  //에디터 정보 전송
  const onSubmit = () => {
    if(datas.length < 1 || title.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      console.log(str)
      axios.put(`${API_URL}/api/notice/${userInfo.id}`,
      {
        postId : getData.id,
        title : title,
        descriptions : datas,
        search_descriptions : str
      },{
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'token': `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('업데이트 성공')
        router.back()
      })
      .catch((err) => {
        alert('Error 404')
        router.push('/notice')
      })
    }
  }

  //홈으로 이동
  const onCancel = () => {
    router.push(`/noticeView/${getData.id}`)
  }

  return (
    <>
      <Topbar json = {{router :'notice', cookies : cookies }} />

      <InputTitle 
      title={title}
      onChange={(data) => {
        setTitle(data)
      }} />

      <Editor
        name="description"
        onChange={(data) => {
          setDatas(data);
          setStr(data);
        }}
        editorLoaded={editorLoaded}
        value={datas}
      />
      <div className={styles.body}>
        <button className={styles.button} onClick={onCancel} style={{backgroundColor:"gray"}}>취소</button>
        <button className={styles.button} onClick={onSubmit} style={{backgroundColor:"#1E00F2"}}>업데이트</button>
      </div>
      
    </>
  );
  
}

export async function getServerSideProps (context) {
  const cookies = context.req.cookies
  const id = context.params.id
  const API_URL = 'http://localhost:5000'
  const getData = await axios.get(`${API_URL}/api/notice/${id}`)
  .then((res) => {
    return res.data
  })
  .catch((err) => {
    console.log(err)
  })
  return {
    props : {
      getData : getData.notice,
      cookies
    }
  }
}