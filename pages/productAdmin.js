import React from "react";
import Head from 'next/head'
import { AdminTopbar } from '../src/component/AdminTopbar'
import { Footer } from "../src/component/Footer";
import { ProductContentList } from "../src/component/ProductContentList";
import { InputProduct } from "../src/component/InputProduct";

export default function ProductAdmin({cookies}) {
  return (
    <div  style={{width : '100%', height : '100vh', display : 'flex', justifyContent : 'space-between', alignItems : 'center', flexFlow : 'column nowrap'}}>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminTopbar json = {{router :'notice', cookies : cookies }} />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem'}}>
        상시상품 리스트 관리
      </div>
      <InputProduct cookies={cookies} />
      <ProductContentList cookies={cookies} main={true} />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem'}}>
        삭제된 상시상품 리스트 관리
      </div>
      <ProductContentList cookies={cookies} main={false} /> 
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