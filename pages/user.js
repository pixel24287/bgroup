import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import { UserTopbar } from '../src/component/UserTopbar'
import { Footer } from "../src/component/Footer";

export default function User({cookies}) {

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserTopbar json = {{cookies : cookies }} />
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