import React from "react";
import Head from 'next/head'
import { AdminTopbar } from '../src/component/AdminTopbar'
import { Footer } from "../src/component/Footer";
import { CheckAdminContentList } from "../src/component/CheckAdminContentList";

export default function BusinessApprovalAdmin({cookies}) {

  return (
    <div  style={{width : '100%', height : '100vh', display : 'flex', justifyContent : 'space-between', alignItems : 'center', flexFlow : 'column nowrap'}}>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminTopbar json = {{router :'notice', cookies : cookies }} />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        처리중
      </div>
      <CheckAdminContentList cookies={cookies} check={false} router={'business_approval'} /> 
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        처리완료
      </div>
      <CheckAdminContentList cookies={cookies} check={true} router={'business_approval'} /> 
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