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
import { PasswordForm } from '../../src/component/PasswordForm'

export default function BusinessApprovalView ({postId, cookies}) {
    const [userInfo, setUserInfo] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [data, setData] = useState()
    const [password, setPassword] = useState('')
    const router = useRouter()
    useEffect(() => {
        if (cookies.accessToken) {
            setUserInfo(jwtDecode(cookies.accessToken))
        }
    }, [cookies.accessToken])

/*
    const API_URL = 'http://localhost:5000'

    const data = await axios.get(`${API_URL}/api/business_approval/${id}/${id}`,{
    headers: {
        token: `Bearer ${cookies.accessToken}`
    }})
    .then((res) => {
        return res.data
    })
    .catch((err) => {
      console.log(err)
    })
*/
    return (
        <>
        {isLogin ?
        <>
            {data.business_approval &&
                <>
                    <Topbar json = {{router :'business_approval', cookies : cookies }} />
                    <Head>
                        <title>{data.business_approval.title}</title>
                        <meta name="description" content='data' />
                    </Head>
                    <ContentPage data={data.business_approval} cookies={cookies} router='business_approval' />
                    <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', flexFlow:'row nowrap'}}>
                        <div style={{width:'80vw', maxWidth:'992px', display:'flex', justifyContent:'flex-end', alignItems:'center', flexFlow:'row nowrap'}}>
                            <Link href={`/updateBusinessApproval/${data.business_approval.id}`}>
                                <a style={{marginRight:'0.5rem'}}>업데이트</a>
                            </Link>
                            <Link href={`/deleteBusinessApproval/${data.business_approval.id}`}>
                                <a style={{marginRight:'0.5rem'}}>삭제</a>
                            </Link>
                        </div>
                    </div>
                    <CommentList comment={data.comment} cookies={cookies} router={'business_approval'} />
                    <WriteComment json = {{post_id : data.business_approval.id, router : 'business_approval' , cookies : cookies}} />
                </>
            }
        </>
        :
            <>
                <Topbar json = {{router :'business_approval', cookies : cookies }} />
                <PasswordForm cookies={cookies} userInfo={userInfo} postId={postId} route={'business_approval'} password={password} setPassword={setPassword} setIsLogin={setIsLogin} setData={setData} />
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
            postId,
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