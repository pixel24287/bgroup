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

export default function noticeView({postId, cookies}) {
    const [userInfo, setUserInfo] = useState({})
    const [data, setData] = useState({})
    const API_URL = 'http://localhost:5000'
    useEffect(async() => {
        if (cookies.accessToken) {
            setUserInfo(jwtDecode(cookies.accessToken))
        }
        try {
            const { data } = await axios.get(`${API_URL}/api/notice/${postId}`)
            setData(data)
        } catch {
            alert('삭제된 계시물입니다.');
            router.back()
        }
    }, [])

    return (
        <>
            {data.notice &&
            <>
                <Topbar json = {{router :'notice', cookies : cookies }} />
                <Head>
                    <title>{data.notice.title}</title>
                    <meta name="description" content='data' />
                </Head>
                <ContentPage data={data.notice} cookies={cookies} router='notice' />
                {userInfo.id == data.notice.user_id || userInfo.isAdmin ? 
                <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap'}}>
                    <div style={{width:'80vw', maxWidth:'992px', display:'flex', justifyContent:'flex-end', alignItems:'center', flexFlow:'row nowrap'}}>
                        <Link href={`/updateNotice/${data.notice.id}`}>
                            <a style={{marginRight:'0.5rem'}}>업데이트</a>
                        </Link>
                        <Link href={`/deleteNotice/${data.notice.id}`}>
                            <a style={{marginRight:'0.5rem'}}>삭제</a>
                        </Link>
                    </div>
                </div>
                    :
                    <>
                    </>
                }
                <CommentList comment={data.comment} cookies={cookies} router={'notice'} />
                <WriteComment json = {{post_id : data.notice.id, router : 'notice' , cookies : cookies}} />
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