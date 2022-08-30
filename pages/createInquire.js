import React from 'react'
import { useRouter } from 'next/router'
import { Editor } from "../src/component/Editor";
import { Header } from "../src/component/Header";
import { Topbar } from "../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { InputTitle } from '../src/component/InputTitle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import styles from '../styles/GuideButton.module.css'
import { InquireForm } from '../src/component/InquireForm';

export default function CreateInquire({cookies}) {
  const router = useRouter()

  //에디터 상태 관리 변수
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState('')
  const [data, setData] = useState("");
  const [str, setStr] = useState("")
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if(cookies.accessToken) {
      setName(jwtDecode(cookies.accessToken).nick_name)
    }
  }, [cookies.accessToken]);

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  //라우터 값이 존재할 때
  useEffect(() => {
    if(router.asPath === '/createInquire') {
      setDisabled(false)
    }
  }, [router.asPath])

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
    if(data.length < 1 || title.length < 1 || name.length < 1 || password.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/inquire/create`,
      {
        title : title,
        descriptions : data,
        search_descriptions : str,
        nick_name : name,
        password : password
      },{
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'token': `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('작성되었습니다.')
        router.push('/inquire')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  //홈으로 이동
  const onCancel = () => {
    router.push('/inquire')
  }

  return (
    <>
    <Topbar json = {{router :'inquire', cookies : cookies }} />
      <InputTitle 
      title={title}
      onChange={(data) => {
        setTitle(data)
      }} />
      <InquireForm name={name} setName={setName} password={password} setPassword={setPassword}/>
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