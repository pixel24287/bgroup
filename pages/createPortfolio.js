import React from 'react'
import { useRouter } from 'next/router'
import { Topbar } from "../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { FileUpload } from '../src/component/FileUpload';

export default function CreateNotice({cookies}) {
  const router = useRouter()

  const [userInfo, setUserInfo] = useState('')

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
  }, [cookies.accessToken]);

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