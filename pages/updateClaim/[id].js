import React from 'react'
import { useRouter } from 'next/router'
import { Header } from "../../src/component/Header";
import { Topbar } from "../../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { InputTitle } from '../../src/component/InputTitle';
import { ClaimForm } from '../../src/component/ClaimForm';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import { Editor } from '../../src/component/Editor';
import { PasswordForm } from '../../src/component/PasswordForm';

import styles from '../../styles/GuideButton.module.css'

export default function UpdateClaim({postId, cookies}) {

  const router = useRouter()
  //에디터 상태 관리 변수
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState('');
  const [disabled, setDisabled] = useState(true)
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [str, setStr] = useState("")

  const [name, setName] = useState('')
  const [newpassword, setNewPassword] = useState('')

  const [trademark, setTrademark] = useState('')
  const [userInformation, setUserInformation] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [transportDocumentNumber, setTransportDocumentNumber] = useState('')
  const [product, setProduct] = useState('')
  const [claimDescription, setClaimDescription] = useState('')
  const [processingMethod, setProcessingMethod] = useState('')

  const API_URL = 'http://localhost:5000'
  const [userInfo, setUserInfo] = useState({})

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    if(cookies.accessToken) {
      setUserInfo(jwtDecode(cookies.accessToken))
    }
    if(data) {
      setTitle(data.claim.title)
      setDesc(data.claim.descriptions)
      setStr(data.claim.descriptions)
      setEditorLoaded(true);
      setDisabled(false)
      setNewPassword(data.claim.password)
      setName(data.claim.nick_name)
      setTrademark(data.claim.trademark)
      setUserInformation(data.claim.user_information)
      setOrderDate(data.claim.order_date)
      setTransportDocumentNumber(data.claim.transport_document_number)
      setProduct(data.claim.product)
      setClaimDescription(data.claim.claim_description)
      setProcessingMethod(data.claim.processing_method)
    }
  }, [data]);

  useEffect(() => {
    if (str !== undefined && str !== null && str !=='') {
      setStr(str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, ""))
      setStr(str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, ""))
      let element = document.createElement('div')
      element.innerHTML = str;
      setStr(element.textContent)
      element.textContent = ''
    }
  }, [str])

  //에디터 정보 전송
  const onSubmit = () => {
    if(desc.length < 1 || title.length < 1 || name.length < 1 || newpassword.length < 1 || trademark.length < 1 || userInformation.length < 1 || orderDate.length < 1 || transportDocumentNumber.length < 1 || product.length < 1 || claimDescription.length < 1 || processingMethod.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      axios.put(`${API_URL}/api/claim/${userInfo.id ? userInfo.id : 0}/${data.claim.id}/${password.length < 1 ? 'password' : password}`,
      {
        title : title,
        descriptions : desc,
        search_descriptions : str,
        nick_name : name,
        password : newpassword,
        trademark : trademark,
        user_information : userInformation,
        order_date : orderDate,
        transport_document_number : transportDocumentNumber,
        product : product,
        claim_description : claimDescription,
        processing_method : processingMethod
      },{
        headers:{
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'token': `Bearer ${cookies.accessToken}`
        }
      })
      .then((res) => {
        alert('업데이트 성공')
        router.back()
      })
      .catch((err) => {
        alert('Error 404')
        router.push('/claim')
      })
    }
  }

  //홈으로 이동
  const onCancel = () => {
    router.push(`/claimView/${data.claim.id}`)
  }

  return (
    <>
    {isLogin ?
    <>
      <Topbar json = {{router :'claim', cookies : cookies }} />

      <InputTitle 
      title={title}
      onChange={(data) => {
        setTitle(data)
      }} />

      <ClaimForm name={name} setName={setName} password={newpassword} setPassword={setNewPassword} trademark={trademark} setTrademark={setTrademark} userInformation={userInformation} setUserInformation={setUserInformation}
      orderDate={orderDate} setOrderDate={setOrderDate} transportDocumentNumber={transportDocumentNumber} setTransportDocumentNumber={setTransportDocumentNumber}
      product={product} setProduct={setProduct} claimDescription={claimDescription} setClaimDescription={setClaimDescription} processingMethod={processingMethod} setProcessingMethod={setProcessingMethod} />
      </>
      :
      <>
        <Topbar json = {{router :'claim', cookies : cookies }} />
        <PasswordForm cookies={cookies} userInfo={userInfo} postId={postId} route={'claim'} password={password} setPassword={setPassword} setIsLogin={setIsLogin} setData={setData} />
      </>
    }
      <Editor
        name="description"
        onChange={(data) => {
          setDesc(data);
          setStr(data);
        }}
        editorLoaded={editorLoaded}
        value={desc}
      />
      <div className={styles.body}>
        <button className={styles.button} onClick={onCancel} disabled={disabled} style={{backgroundColor:"gray"}}>취소</button>
        <button className={styles.button} onClick={onSubmit} disabled={disabled} style={{backgroundColor:"#1E00F2"}}>업데이트</button>
      </div>
      
    </>
  );
  
}

export async function getServerSideProps (context) {
  const cookies = context.req.cookies
  const postId = context.params.id
  return {
    props : {
      postId : postId,
      cookies
    }
  }
}