import React from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function DeleteOrderRegistration({cookies, postId}) {

  const router = useRouter()

  const API_URL = 'http://localhost:5000'
  const [userInfo, setUserInfo] = useState({})

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    if(cookies.accessToken) {
      setUserInfo(jwtDecode(cookies.accessToken))
    } else {
      alert('로그인을 하세요.')
      router.push('/login')
    }
  }, []);

  //에디터 정보 전송
  const onSubmit = () => {
    let checkDelete = confirm('삭제하시겠습니까?')
    if(checkDelete) {
      axios.delete(`${API_URL}/api/order_registration/${userInfo.id}`,
      {
        data : {
            postId : postId
        },
        headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json',
    
            'token': `Bearer ${cookies.accessToken}`
        },
        withCredentials: true
      })
      .then((res) => {
        alert('삭제되었습니다.')
        router.push('/orderRegistration')
      })
      .catch((err) => {
          alert('Error 404')
          console.log(err)
      })
    } else {
      router.back()
    }
  }

  //홈으로 이동
  const onCancel = () => {
    router.push(`/orderRegistrationView/${getData.id}`)
  }

  return (
    <div style={{width:'100vw', height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center', flexFlow:'column nowrap'}}>
        <p style={{fontSize:'1.2rem'}}>삭제하시겠습니까?</p>
        <div style={{margin:'1rem', display: 'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap'}}>
            <p style={{margin:'1rem', cursor:'pointer'}} onClick={onSubmit}>예</p>
            <p style={{margin:'1rem', cursor:'pointer'}} onClick={onCancel}>아니오</p>        
        </div>

    </div>
  );
  
}

export async function getServerSideProps (context) {
  const cookies = context.req.cookies
  const id = context.params.id
  return {
    props : {
      postId : id,
      cookies
    }
  }
}