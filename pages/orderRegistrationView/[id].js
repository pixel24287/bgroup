import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

import { Topbar } from '../../src/component/Topbar'
import { ContentPage } from '../../src/component/ContentPage'
import Link from 'next/link'

import jwtDecode from 'jwt-decode'
import { WriteComment } from '../../src/component/WriteComment'
import { CommentList } from '../../src/component/CommentList'

export default function OrderRegistrationView({data, cookies}) {
    const [userInfo, setUserInfo] = useState({})
    const router = useRouter();
    useEffect(() => {
        if (cookies.accessToken) {
            setUserInfo(jwtDecode(cookies.accessToken))
        } else {
            alert('로그인을 하세요.')
            router.push('/login')
        }
    }, [cookies.accessToken])

    return (
        <>
            {data.order_registration &&
            <>
                <Topbar json = {{router :'order_registration', cookies : cookies }} />
                <Head>
                    <title>{data.order_registration.title}</title>
                    <meta name="description" content='data' />
                </Head>
                <ContentPage data={data.order_registration} cookies={cookies} router='order_registration' />
                {userInfo.id == data.order_registration.user_id || userInfo.isAdmin ? 
                <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap'}}>
                    <div style={{width:'80vw', maxWidth:'992px', display:'flex', justifyContent:'flex-end', alignItems:'center', flexFlow:'row nowrap'}}>
                        <Link href={`/updateOrderRegistration/${data.order_registration.id}`}>
                            <a style={{marginRight:'0.5rem'}}>업데이트</a>
                        </Link>
                        <Link href={`/deleteOrderRegistration/${data.order_registration.id}`}>
                            <a style={{marginRight:'0.5rem'}}>삭제</a>
                        </Link>
                    </div>
                </div>
                    :
                    <>
                    </>
                }
                <CommentList comment={data.comment} cookies={cookies} router={'order_registration'} />
                <WriteComment json = {{post_id : data.order_registration.id, router : 'order_registration' , cookies : cookies}} />
            </>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = context.req.cookies
    const id = context.params.id
    let ids = 0
    if (cookies.accessToken) {
        ids = jwtDecode(cookies.accessToken).id
    }
    const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order_registration/${ids}/${id}`,{
    headers: {
        token: `Bearer ${cookies.accessToken}`
    }})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        return 'err'
    })
    return {
        props : {
            data,
            cookies : cookies
        }
    }
}
/*
export const getStaticPaths = async () => {
	return {
		paths: [
            {params : {id: ''}}
        ],
		fallback: true
	}
}

export const getStaticProps = async (path) =>{
    const cookies = context
    const id = path.params.id
    const API_URL = 'http://localhost:5000'
    const data = await axios.get(`${API_URL}/api/guide/${id}`)
    .then((res) => {
        return res.data
    })
    .catch((err) => {
      console.log(err)
    })
    return {
        props : {
            data,
            cookies : cookies
        }
    }
}*/