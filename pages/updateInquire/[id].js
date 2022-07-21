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
import { InquireForm } from '../../src/component/InquireForm';
import { PasswordForm } from '../../src/component/PasswordForm';

export default function updateInquire({postId, cookies}) {

  const router = useRouter()
  //에디터 상태 관리 변수
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [str, setStr] = useState("")

  const [name, setName] = useState('')
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState('')
  const [data, setData] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  const API_URL = 'http://localhost:5000'
  const [userInfo, setUserInfo] = useState({})

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    if(cookies.accessToken) {
      setUserInfo(jwtDecode(cookies.accessToken))
    } if(data) {
      setTitle(data.inquire.title)
      setDesc(data.inquire.descriptions)
      setStr(data.inquire.descriptions)
      setName(data.inquire.nick_name)
      setNewPassword(data.inquire.password)

      setEditorLoaded(true)
      setDisabled(false)
    }
  }, [data]);

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
    if(desc.length < 1 || title.length < 1 || name.length < 1 || newPassword.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      axios.put(`${API_URL}/api/inquire/${userInfo.id ? userInfo.id : 0}/${data.inquire.id}/${password.length < 1 ? 'password' : password}`,
      {
        title : title,
        descriptions : desc,
        search_descriptions : str,
        nick_name : name,
        password : newPassword
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
        router.push('/inquire')
      })
    }
  }

  //홈으로 이동
  const onCancel = () => {
    router.push(`/inquireView/${data.inquire.id}`)
  }

  return (
    <>
    {isLogin ?
      <>
        <Topbar json = {{router :'inquire', cookies : cookies }} />

        <InputTitle 
        title={title}
        onChange={(data) => {
          setTitle(data)
        }} />
        <InquireForm name={name} setName={setName} password={newPassword} setPassword={setNewPassword}/>
      </>
      :
      <>
        <Topbar json = {{router :'inquire', cookies : cookies }} />
        <PasswordForm cookies={cookies} userInfo={userInfo} postId={postId} route={'inquire'} password={password} setPassword={setPassword} setIsLogin={setIsLogin} setData={setData} />
      </>
    }
      <Editor
        name="description"
        onChange={(data) => {
          setDesc(data);
          setStr(data);
        }}
        editorLoaded={editorLoaded}
        value={desc}
      />
      <div className={styles.body}>
        <button className={styles.button} onClick={onCancel} disabled={disabled} style={{backgroundColor:"gray"}}>취소</button>
        <button className={styles.button} onClick={onSubmit} disabled={disabled} style={{backgroundColor:"#1E00F2"}}>업데이트</button>
      </div>
      
    </>
  );
  
}

export async function getServerSideProps (context) {
  const cookies = context.req.cookies
  const postId = context.params.id
  return {
    props : {
      postId : postId,
      cookies
    }
  }
}