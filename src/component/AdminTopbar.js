import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from '../style/Topbar.module.css'
import { useRouter } from 'next/router'

import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const AdminTopbar = ({json}) => {
  const router = useRouter();

  //const [cookie, setCookie] = useRecoilState(cookieState)

  const API_URL = 'http://localhost:5000'
  const [logout, setLogout] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [menu, setMenu] = useState(false)
  const [productList, setProductList] = useState([])
  const [userMenu, setUserMenu] = useState(false)

  useEffect(async () => {
    if (json.cookies.accessToken) {
      const user = jwtDecode(json.cookies.accessToken)
      setUserInfo(user)
      setLogout(true)
      if (!user.isAdmin){
        alert('권한이 부족합니다.');
        router.back()
      }
    }
    const { data } = await axios.get(`${API_URL}/api/product/data_list`)
    setProductList(data)
  }, [])

  return (
    <div className={styles.container} >
      <ul className={styles.menu}>
      <li className={styles.title}>
          <Link href='/'>
            <a>비그룹</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/sliderAdmin'>
            <a>슬라이더 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/noticeAdmin'>
            <a>공지사항 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/businessApprovalAdmin'>
            <a>사업자승인신청 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/orderRegistrationAdmin'>
            <a>발주서등록 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/productAdmin'>
            <a>상시상품 리스트 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/inquireAdmin'>
            <a>문의사항 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/claimAdmin'>
            <a>클레임등록 관리</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/accountAdmin'>
            <a>유저정보 관리</a>
          </Link>
        </li>
      </ul>
      <div>
        {logout ? 
        <div onClick={() => {
          menu ? setMenu(false) : setMenu(true)
        }} className={styles.menu}>
            <Link href='/logout'>
              <a className={styles.button}>로그아웃</a>
            </Link>
            <div>
            <div className={styles.title} onClick={() => {userMenu ? setUserMenu(false) : setUserMenu(true)}}>{userInfo.nick_name}</div>
            <ul className={userMenu ? styles.sub_menu : styles.hidden_sub_menu}>
            <li>
              <Link href='/user'>
                <a>유저 정보</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>일반 페이지</a>
              </Link>
            </li>
            </ul>
          </div>
          <div>
          </div>
        </div>
        :
          <>
          <Link href='/login'>
            <a className={styles.button}>로그인</a>
          </Link>
        </>}
      </div>
    </div>
  )
}