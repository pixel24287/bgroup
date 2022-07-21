import React from "react";
import Head from 'next/head'
import { Topbar } from '../src/component/Topbar'
import Slider from "../src/component/Slider";


export default function index({cookies}) {
  //recoil 설정
  /*const [cookie, setCookie] = useRecoilState(cookieState)
  const [ userInformation, setUserInformation] = useRecoilState(userInformationState)
  const [ route , setRouter] = useRecoilState(routerState)

  //쿠카 저장
  useEffect(() => {
    setCookie(cookies)
  }, [cookie])*/

  return (
    <>
      <Head>
        <title>title</title>
        <meta name="description" content="Counter Clock Wise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar json = {{router :'/', cookies : cookies }} />
      <Slider />
      <div style={{width : '100%', display : 'flex', justifyContent : 'center', alignItems : 'center', fontSize : '2rem', padding : '3rem'}}>
        비그룹에 오신것을 환영합니다.
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}, // will be passed to the page component as props
  }
}