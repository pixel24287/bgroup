import React from 'react'
import { useRouter } from 'next/router'
import { Editor } from "../src/component/Editor";
import { Header } from "../src/component/Header";
import { Topbar } from "../src/component/Topbar";
import { useState } from 'react';
import { useEffect } from 'react';
import { InputTitle } from '../src/component/InputTitle';
import { ClaimForm } from '../src/component/ClaimForm';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import styles from '../styles/GuideButton.module.css'

export default function createClaim({cookies}) {
  const router = useRouter()

  //에디터 상태 관리 변수
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState('')
  const [data, setData] = useState("")
  const [str, setStr] = useState("")
  const [disabled, setDisabled] = useState(true)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [trademark, setTrademark] = useState('')
  const [userInformation, setUserInformation] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [transportDocumentNumber, setTransportDocumentNumber] = useState('')
  const [product, setProduct] = useState('')
  const [claimDescription, setClaimDescription] = useState('')
  const [processingMethod, setProcessingMethod] = useState('')


  const API_URL = 'http://localhost:5000'

  useEffect(() => {
    if(cookies.accessToken) {
      setName(jwtDecode(cookies.accessToken).nick_name)
    }
  }, []);

  //ckEditor 특성상 페이지가 마운트 된 이후 에디터를 보여줘야함
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  //라우터 값이 존재할 때
  useEffect(() => {
    if(router.asPath === '/createClaim') {
      setDisabled(false)
    }
  }, [router.asPath])

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
    if(data.length < 1 || title.length < 1 || name.length < 1 || password.length < 1 || trademark.length < 1 || userInformation.length < 1 || orderDate.length < 1 || transportDocumentNumber.length < 1 || product.length < 1 || claimDescription.length < 1 || processingMethod.length < 1) {
      alert('내용을 작성해주세요!')
    } else {
      axios.post(`${API_URL}/api/claim/create`,
      {
        title : title,
        descriptions : data,
        search_descriptions : str,
        nick_name : name,
        password : password,
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
        alert('작성되었습니다.')
        router.push('/claim')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
  //홈으로 이동
  const onCancel = () => {
    router.push('/claim')
  }

  return (
    <>
    <Topbar json = {{router :'claim', cookies : cookies }} />
      <InputTitle 
      title={title}
      onChange={(data) => {
        setTitle(data)
      }} />

      <ClaimForm name={name} setName={setName} password={password} setPassword={setPassword} trademark={trademark} setTrademark={setTrademark} userInformation={userInformation} setUserInformation={setUserInformation}
      orderDate={orderDate} setOrderDate={setOrderDate} transportDocumentNumber={transportDocumentNumber} setTransportDocumentNumber={setTransportDocumentNumber}
      product={product} setProduct={setProduct} claimDescription={claimDescription} setClaimDescription={setClaimDescription} processingMethod={processingMethod} setProcessingMethod={setProcessingMethod} />
      
      <Editor
        name="description"
        onChange={(data) => {
          setData(data);
          setStr(data)
        }}
        editorLoaded={editorLoaded}
      />
      <div className={styles.body}>
        <button className={styles.button} disabled={disabled} onClick={onCancel} style={{backgroundColor:"gray"}}>취소</button>
        <button className={styles.button} disabled={disabled} onClick={onSubmit} style={{backgroundColor:"#1E00F2",}}>등록</button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies
  return {
    props: {cookies : cookies}
  }
}