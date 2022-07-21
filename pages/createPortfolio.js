import React from 'react'
import { useRouter } from 'next/router'
import { Topbar } from "../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { InputTitle } from '../src/component/InputTitle';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import styles from '../styles/GuideButton.module.css'
import { FileUpload } from '../src/component/FileUpload';

export default function createNotice({cookies}) {
  const router = useRouter()

  //에디터 상태 관리 변수
  const [title, setTitle] = useState('')

  const [userInfo, setUserInfo] = useState('')

  const API_URL = 'http://localhost:5000'

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    if(cookies.accessToken) {
        const userInformation = jwtDecode(cookies.accessToken)
        if (!userInformation.isAdmin) {
            alert('권한이 부족합니다..')
            router.push('/portfolio')
        }
        setUserInfo(userInformation)

    } else {
      alert('로그인을 하세요.')
      router.push('/login')
    }
  }, []);

  return (
    <>
    <Topbar json = {{router :'portfolio', cookies : cookies }} />
    <FileUpload route = {'portfolio'} />
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}