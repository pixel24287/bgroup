import React from "react";
import Head from 'next/head'
import { UserTopbar } from '../src/component/UserTopbar'
import { Footer } from "../src/component/Footer";
import { UserContentList } from "../src/component/UserContentList";

export default function UserBusinessApproval({cookies}) {

  return (
    <div  style={{width : '100%', height : '100vh', display : 'flex', justifyContent : 'space-between', alignItems : 'center', flexFlow : 'column nowrap'}}>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserTopbar json = {{router :'business_approval', cookies : cookies }} />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        답변 대기중
      </div>
      <UserContentList cookies={cookies} check={false} router={'business_approval'} /> 
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        답변완료
      </div>
      <UserContentList cookies={cookies} check={true} router={'business_approval'} /> 
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}