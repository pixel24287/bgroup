import React from 'react'
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router'
import { Editor } from "../src/component/Editor";
import { Header } from "../src/component/Header";
import { Topbar } from "../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { InputTitle } from '../src/component/InputTitle';
import { BusinessApprovalForm } from '../src/component/BusinessApprovalForm';
import axios from 'axios';

import styles from '../styles/GuideButton.module.css'

export default function CreateBusinessApproval({cookies}) {
  const router = useRouter()

  //에디터 상태 관리 변수
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState('')
  const [data, setData] = useState("")
  const [str, setStr] = useState("")
  const [disabled, setDisabled] = useState(true)

  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [keySalesChannel, setKeySalesChannel] = useState('')


  const API_URL = 'http://localhost:5000'

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  //라우터 값이 존재할 때
  useEffect(() => {
    if(router.asPath === '/createBusinessApproval') {
      setDisabled(false)
    }
  }, [router.asPath])

  useEffect(() => {
    if(cookies.accessToken) {
      const userInfo = jwtDecode(cookies.accessToken)
      setNickName(userInfo.nick_name)
      setEmail(userInfo.email)
    }
  }, []);


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
    if(data.length < 1 || title.length < 1 || nickName.length < 1 || name.length < 1 || password.length < 1 || email.length < 1 || phoneNumber.length < 1 || keySalesChannel.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      axios.post(`${API_URL}/api/business_approval/create`,
      {
        title : title,
        descriptions : data,
        search_descriptions : str,
        nick_name : nickName,
        name : name,
        password : password,
        email : email,
        phone_number : phoneNumber,
        key_sales_channel : keySalesChannel,
      },{
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'token': `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('작성되었습니다.')
        router.push('/businessApproval')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  //홈으로 이동
  const onCancel = () => {
    router.push('/businessApproval')
  }

  return (
    <>
    <Topbar json = {{router :'BusinessApproval', cookies : cookies }} />
      <InputTitle 
      title={title}
      onChange={(data) => {
        setTitle(data)
      }} />

      <BusinessApprovalForm name={name} setName={setName} nickName={nickName} setNickName={setNickName} password={password} setPassword={setPassword} email={email} setEmail={setEmail} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} keySalesChannel={keySalesChannel} setKeySalesChannel={setKeySalesChannel}/>

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