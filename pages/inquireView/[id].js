import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Topbar } from '../../src/component/Topbar'
import { ContentPage } from '../../src/component/ContentPage'
import Link from 'next/link'

import jwtDecode from 'jwt-decode'
import { PasswordForm } from '../../src/component/PasswordForm'
import { WriteComment } from '../../src/component/WriteComment'
import { CommentList } from '../../src/component/CommentList'

export default function inquireView({postId, cookies}) {
    const [userInfo, setUserInfo] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [data, setData] = useState()
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (cookies.accessToken) {
            setUserInfo(jwtDecode(cookies.accessToken))
        }
    }, [])

    return (
        <>
            {isLogin ?
            <>
                {data.inquire &&
                <>
                    <Topbar json = {{router :'inquire', cookies : cookies }} />
                    <Head>
                        <title>{data.inquire.title}</title>
                        <meta name="description" content='data' />
                    </Head>
                    <ContentPage data={data.inquire} cookies={cookies} router='inquire' />
                    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap'}}>
                        <div style={{width:'80vw', maxWidth:'992px', display:'flex', justifyContent:'flex-end', alignItems:'center', flexFlow:'row nowrap'}}>
                            <Link href={`/updateInquire/${data.inquire.id}`}>
                                <a style={{marginRight:'0.5rem'}}>업데이트</a>
                            </Link>
                            <Link href={`/deleteInquire/${data.inquire.id}`}>
                                <a style={{marginRight:'0.5rem'}}>삭제</a>
                            </Link>
                        </div>
                    </div>
                    <CommentList comment={data.comment} cookies={cookies} router={'inquire'} />
                    <WriteComment json = {{post_id : data.inquire.id, router : 'inquire' , cookies : cookies}} />
                </>
                }
            </>
            :
            <>
                <Topbar json = {{router :'inquire', cookies : cookies }} />
                <PasswordForm cookies={cookies} userInfo={userInfo} postId={postId} route={'inquire'} password={password} setPassword={setPassword} setIsLogin={setIsLogin} setData={setData} />
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