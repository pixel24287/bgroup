import Link from 'next/link'
import React from 'react'
import { RegisterForm } from '../src/component/RegisterForm'

export default function register({cookies}) {

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
        <RegisterForm />
      </>
    )
  }
}

export async function getServerSideProps (context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}