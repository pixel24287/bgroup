import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import styles from '../style/Topbar.module.css'
import { useRouter } from 'next/router'
import menuIcon from '../icons/menu.svg'


import axios from 'axios'
import jwtDecode from 'jwt-decode'
export const Topbar = ({json}) => {
  const router = useRouter();

  //const [cookie, setCookie] = useRecoilState(cookieState)
  const [logout, setLogout] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [menu, setMenu] = useState(false)
  const [productMenu, setProductMenu] = useState(false)
  const [productList, setProductList] = useState([])
  const [userMenu, setUserMenu] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(async () => {
    if (json.cookies.accessToken) {
      setUserInfo(jwtDecode(json.cookies.accessToken))
      setLogout(true)
    }
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/data_list`)
    setProductList(data)
  }, [])

  return (
  <div className={styles.container} >
    <ul className={styles.menu}>
      <li className={styles.main_logo}>
          <Link href='/'>
            <a>비그룹</a>
          </Link>
      </li>
      <li className={styles.top}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>비그룹</a>
          </Link>
        </div>
        <div className={styles.image} onClick={() => {toggle ? setToggle(false) : setToggle(true)}}><Image src={menuIcon} width={40} height={40}></Image></div>
      </li>
      <div className={toggle ? styles.main_menu : styles.hidden_main_menu}>
        <li className={styles.title}>
          <Link href='/notice'>
            <a>공지사항</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/businessApproval'>
            <a>사업자승인신청</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/orderRegistration'>
            <a>발주서등록</a>
          </Link>
        </li>
        <li className={styles.sub_container}>
          <div className={styles.title} onClick={() => {productMenu ? setProductMenu(false) : setProductMenu(true)}}>상시상품</div>
          <ul className={productMenu ? styles.sub_menu : styles.hidden_sub_menu}>
            {productList.map((val, index) => (
              <li key={index} className={styles.sub_container}>
                  <a onClick={async() => {
                    await router.push('/product/' + val.id);
                    router.reload()}
                  }>{val.title}</a>
              </li>
            ))}
            {userInfo.isAdmin ?
            <li className={styles.sub_container}>
              <Link href='/productAdmin'>
                <a>상품을 추가하세요</a>
              </Link>
            </li> 
            :
            <></>}
          </ul>
        </li>
        <li className={styles.title}>
          <Link href='/inquire'>
            <a>문의하기</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/claim'>
            <a>클레임등록</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/map'>
            <a>찾아오시는 길</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/portfolio'>
            <a>Portfolio</a>
          </Link>
        </li>

        </div>
      </ul>
      <div className={styles.sub_container}>
        {logout ? 
        <div onClick={() => {
          menu ? setMenu(false) : setMenu(true)
          }} className={toggle ? styles.menu : styles.hidden_menu}>
          <div className={styles.sub_container}>
            <div className={styles.title} onClick={() => {userMenu ? setUserMenu(false) : setUserMenu(true)}}>{userInfo.nick_name}</div>
            <ul className={userMenu ? styles.sub_menu : styles.hidden_sub_menu}>
              <li>
                <Link href='/user'>
                  <a>유저 정보</a>
                </Link>
              </li>
              {userInfo.isAdmin ?
                <li>
                  <Link href='/admin'>
                    <a>관리자 페이지</a>
                  </Link>
                </li>
                :
                <></>}
              </ul>
            </div>
            <Link href='/logout'>
              <a className={styles.button}>로그아웃</a>
            </Link>
          <div>
        </div>
      </div>
      :
        <div className={toggle ? styles.menu : styles.hidden_menu}>
        <Link href='/login'>
          <a className={styles.button}>로그인</a>
        </Link>
      </div>}
    </div>
  </div>
  )
}