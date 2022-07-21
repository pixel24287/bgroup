import Head from 'next/head'
import React, { useEffect } from 'react'
import styles from '../style/ContentPage.module.css'
import { BusinessApprovalPage } from './BusinessApprovalPage'
import { ClaimPage } from './ClaimPage'

export const ContentPage = ({data, cookies, router}) => {
  const year = new Date(data.created_at).getFullYear()
  const month = ('0' + (new Date(data.created_at).getMonth() + 1)).slice(-2);
  const day = ('0' + new Date(data.created_at).getDate()).slice(-2);
  
  useEffect(() => {
    //youtube
    document.querySelectorAll( 'oembed[url]' ).forEach( element => {
      // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
      // to discover the media.
      const anchor = document.createElement( 'a' );

      anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
      anchor.className = 'embedly-card';

      element.appendChild( anchor );
  } );
  }, [])
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <Head>
          <script async charset="utf-8" src="//cdn.embedly.com/widgets/platform.js"></script>
        </Head>
        <div>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.past}>{data.nick_name} · {year}년 {month}월 {day}일</p>
        </div>
        {router === 'claim' ? 
        <ClaimPage data={data} />
        :
        <></>
        }
        {router === 'business_approval' ? 
        <BusinessApprovalPage data={data} />
        :
        <></>
        }
        <div dangerouslySetInnerHTML={{__html : data.descriptions}} className={styles.container}></div>
      </div>
    </div>
  )
}
