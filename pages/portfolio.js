import React, { useState, useEffect, useRef } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Selector } from '../src/component/Selector'
import { Topbar } from '../src/component/Topbar'
import Slider from "../src/component/Slider";
import { Footer } from "../src/component/Footer";

import BgroupImg from '../src/image/b_group_img.jpg'
import { PortfolioContentList } from "../src/component/PortfolioContentList";

export default function portfolio({cookies}) {

  const [delay1, setDelay1] = useState(0)
  const [delay2, setDelay2] = useState(1)

  useEffect(() => {
    setTimeout(() => {
      setDelay1(0.2)
      setDelay2(0.8)
    }, 2000)
    setTimeout(() => {
      setDelay1(0.3)
      setDelay2(0.7)
    }, 2050)
    setTimeout(() => {
      setDelay1(0.4)
      setDelay2(0.6)
    }, 2100)
    setTimeout(() => {
      setDelay1(0.5)
      setDelay2(0.5)
    }, 2150)
    setTimeout(() => {
      setDelay1(0.6)
      setDelay2(0.4)
    }, 2200)
    setTimeout(() => {
      setDelay1(0.7)
      setDelay2(0.3)
    }, 2250)
    setTimeout(() => {
      setDelay1(0.8)
      setDelay2(0.2)
    }, 2300)
    setTimeout(() => {
      setDelay1(0.9)
      setDelay2(0.1)
    }, 2350)
    setTimeout(() => {
      setDelay1(1)
      setDelay2(0)
    }, 2400)
  }, [])

  return (
    <>
    <div style={{opacity : delay1}}>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar json = {{router :'portfolio', cookies : cookies }} />
      <Slider />
      <PortfolioContentList cookies={cookies} router={'portfolio'} />
      <Footer />
    </div>
    <div style={{opacity : delay2, position: 'fixed', left:'0', top:'0', width:'100%', height:'100%', backgroundColor:'black', display: delay2 > 0 ? 'flex' : 'none', justifyContent:'center', alignItems:'center'}}>
      <Image src={BgroupImg} width='400' height='400' />
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}