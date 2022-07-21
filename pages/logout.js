import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
      axios.post(`api/access_logout`,{
      },{
          headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',
        }
      })
      axios.post(`api/refresh_logout`,{
      },{
          headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',
        }
      })
      alert('로그아웃 성공');
      router.back()
  }, [])

  return (
    <>
    </>
  )
}