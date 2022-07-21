import Link from 'next/link'
import React from 'react'
import { AuthForm } from '../src/component/AuthForm'

export default function Login({cookies}) {
  if(cookies.refreshToken) {
    return (
      <div style={{width:'100vw', height:'100vh', display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <Link href='/notice'>
        <a style={{fontSize:'1.2rem'}}>홈으로</a>
      </Link>
      </div>
    )
  } else {
    return (
      <>
        <AuthForm />
      </>
    )
  }
}

export async function getServerSideProps (context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies},
  }
}