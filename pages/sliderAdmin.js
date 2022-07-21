import React from "react";
import Head from 'next/head'
import { AdminTopbar } from '../src/component/AdminTopbar'
import { Footer } from "../src/component/Footer";
import { FileUpload } from "../src/component/FileUpload";
import { PortfolioContentList } from "../src/component/PortfolioContentList";

export default function orderRegistrationAdmin({cookies}) {

  return (
    <div  style={{width : '100%', height : '100vh', display : 'flex', justifyContent : 'space-between', alignItems : 'center', flexFlow : 'column nowrap'}}>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminTopbar json = {{router :'notice', cookies : cookies }} />
      <FileUpload route={'slider'} />
      <PortfolioContentList cookies={cookies} router={'slider'} />
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