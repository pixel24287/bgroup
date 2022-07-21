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

export default function productView({postId, cookies}) {
    const [userInfo, setUserInfo] = useState({})
    const [data, setData] = useState({})
    const router = useRouter()
    const API_URL = 'http://localhost:5000'
    useEffect(async() => {
        if (cookies.accessToken) {
            setUserInfo(jwtDecode(cookies.accessToken))
        }
        try {
            const { data } = await axios.get(`${API_URL}/api/product/${postId}`)
            setData(data)
        } catch {
            alert('존재하지 않는 계시물입니다.');
            router.back()
        }
    }, [])

    return (
        <>
            {data.product &&
            <>
                <Topbar json = {{router :'product', cookies : cookies }} />
                <Head>
                    <title>{data.product.title}</title>
                    <meta name="description" content='data' />
                </Head>
                <ContentPage data={data.product} cookies={cookies} router='product' />
                {userInfo.id == data.product.user_id || userInfo.isAdmin ? 
                <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap'}}>
                    <div style={{width:'80vw', maxWidth:'992px', display:'flex', justifyContent:'flex-end', alignItems:'center', flexFlow:'row nowrap'}}>
                        <Link href={`/updateProduct/${data.product.id}`}>
                            <a style={{marginRight:'0.5rem'}}>업데이트</a>
                        </Link>
                        <Link href={`/deleteProduct/${data.product.id}`}>
                            <a style={{marginRight:'0.5rem'}}>삭제</a>
                        </Link>
                    </div>
                </div>
                    :
                    <>
                    </>
                }
                <CommentList comment={data.comment} cookies={cookies} router={'product'} />
                <WriteComment json = {{post_id : data.product.id, router : 'product' , cookies : cookies}} />
            </>
            }
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = context.req.cookies
    const postId = context.params.id
    return {
        props : {
            postId : postId,
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