import React from "react";
import Head from 'next/head'
import { AdminTopbar } from '../src/component/AdminTopbar'
import { Footer } from "../src/component/Footer";

export default function Admin({cookies}) {

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminTopbar json = {{router :'notice', cookies : cookies }} />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}