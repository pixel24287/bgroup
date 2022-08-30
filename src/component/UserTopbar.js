import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import styles from '../style/Topbar.module.css'
import { useRouter } from 'next/router'

import axios from 'axios'
import jwtDecode from 'jwt-decode'

export const UserTopbar = ({json}) => {
  const router = useRouter();

  const [logout, setLogout] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [menu, setMenu] = useState(false)
  const [userMenu, setUserMenu] = useState(false)

  useEffect(async () => {
    if (json.cookies.accessToken) {
      setUserInfo(jwtDecode(json.cookies.accessToken))
      setLogout(true)
    } else {
      alert('로그인을 하세요.');
      router.push('/login')
    }
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
          <Link href='/userBusinessApproval'>
            <a>내 사업자승인신청내역</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/userOrderRegistration'>
            <a>내 발주서등록내역</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/userInquire'>
            <a>내 문의내역</a>
          </Link>
        </li>
        <li className={styles.title}>
          <Link href='/userClaim'>
            <a>내 클레임내역</a>
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