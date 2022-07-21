import React from "react";
import Head from 'next/head'
import { AdminTopbar } from '../src/component/AdminTopbar'
import { Footer } from "../src/component/Footer";
import { CheckAdminContentList } from "../src/component/CheckAdminContentList";

export default function OrderRegistrationAdmin({cookies}) {

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
      <CheckAdminContentList cookies={cookies} check={false} router={'order_registration'} /> 
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        처리완료
      </div>
      <CheckAdminContentList cookies={cookies} check={true} router={'order_registration'} /> 
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