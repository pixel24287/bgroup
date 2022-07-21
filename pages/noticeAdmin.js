import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { AdminTopbar } from '../src/component/AdminTopbar'
import { Footer } from "../src/component/Footer";
import { MainNoticeContentList } from "../src/component/MainNoticeContentList";

export default function noticeAdmin({cookies}) {

  return (
    <div  style={{width : '100%', height : '100vh', display : 'flex', justifyContent : 'space-between', alignItems : 'center', flexFlow : 'column nowrap'}}>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminTopbar json = {{router :'notice', cookies : cookies }} />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        메인 공지사항
      </div>
      <MainNoticeContentList cookies={cookies} main={true} admin_page={true} />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        부 공지사항
      </div>
      <MainNoticeContentList cookies={cookies} main={false} admin_page={true} />
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