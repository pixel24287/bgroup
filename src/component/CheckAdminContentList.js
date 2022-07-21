import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import jwtDecode from 'jwt-decode';

import styles from '../style/ContentList.module.css'
import { CheckAdminContent } from './CheckAdminContent'
import { CheckAdminPagination } from './CheckAdminPagination'

export const CheckAdminContentList = ({cookies, check, router}) => {
  const API_URL = 'http://localhost:5000'
  const [contents, setContents] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [checkRouter, setCheckRouter] = useState()
  const [excelFileName, setExcelFileName] = useState('')
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (cookies.accessToken) {
      setUserInfo(jwtDecode(cookies.accessToken))
    }
  }, [])

  //데이터 불러오기
  useEffect(async () => {
    if (check) {
      const { data } = await axios.get(`${API_URL}/api/${router}/check/${pageNumber - 1}`)
      setContents(data)
    } else {
      const { data } = await axios.get(`${API_URL}/api/${router}/no/check`)
      setContents(data)
    }
  }, [pageNumber])

  useEffect(() => {
  if (router === 'business_approval') {
    setCheckRouter('businessApproval')
    setExcelFileName('사업자승인신청')
  }
  else if (router === 'order_registration') {
    setCheckRouter('orderRegistration')
    setExcelFileName('발주서등록')
  }
  else if (router === 'claim') {
    setCheckRouter(router)
    setExcelFileName('클레임')
  }
  else if (router === 'inquire') {
    setCheckRouter(router)
    setExcelFileName('문의사항')
  }
  setPageNumber(1)
}, [router])

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';

  const excelDownload = async (router) => {
    let excelData = []

    if (check) {
      const { data } = await axios.get(`${API_URL}/api/${router}/check/list/${userInfo.id}`,{
        headers : {
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'Token': `Bearer ${cookies.accessToken}`
        }
      })
      excelData = data
    } else {
      const { data } = await axios.get(`${API_URL}/api/${router}/no/check/list/${userInfo.id}`,{
        headers : {
          'Content-type': 'application/json',
          'Accept': 'application/json',

          'Token': `Bearer ${cookies.accessToken}`
        }
      })
      excelData = data
    }

    if (router === 'business_approval') {
      const ws = XLSX.utils.aoa_to_sheet([
        [excelFileName],
        [],
        ['제목', '작성자', '이름', '이메일', '전화번호', '주요판매채널', '내용']
      ]);

      excelData.map((data) => {
        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              data.title,
              data.nick_name,
              data.name,
              data.email,
              data.phone_number,
              data.key_sales_channel,
              data.search_descriptions
            ]
          ],
          {origin: -1}
        );
        ws['!cols'] = [
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 450 },
          { wpx: 450 },
        ]
        return false;
      });
      
    const wb = {Sheets: { data: ws }, SheetNames: ['data']};
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: excelFileType});
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);

    }
    else if (router === 'order_registration') {
      const ws = XLSX.utils.aoa_to_sheet([
        [excelFileName],
        [],
        ['제목', '작성자', '내용']
      ]);

      excelData.map((data) => {
        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              data.title,
              data.nick_name,
              data.search_descriptions
            ]
          ],
          {origin: -1}
        );
        ws['!cols'] = [
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 450 },
        ]
        return false;
      });
      
    const wb = {Sheets: { data: ws }, SheetNames: ['data']};
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: excelFileType});
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }
    else if (router === 'claim') {
      const ws = XLSX.utils.aoa_to_sheet([
        [excelFileName],
        [],
        ['제목', '작성자', '상호(채널명)', '고객 이름, 주소, 연락처', '발주날짜', '운송장번호', '주문상품', '클레임내용', '처리방법(환불/재발송등)', '내용']
      ]);

      excelData.map((data) => {
        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              data.title,
              data.nick_name,
              data.trademark,
              data.user_information,
              data.order_date,
              data.transport_document_number,
              data.product,
              data.claim_description,
              data.processing_method,
              data.search_descriptions,
            ]
          ],
          {origin: -1}
        );
        ws['!cols'] = [
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 450 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 450 },
        ]
        return false;
      });
      
    const wb = {Sheets: { data: ws }, SheetNames: ['data']};
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: excelFileType});
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }
    else if (router === 'inquire') {
      const ws = XLSX.utils.aoa_to_sheet([
        [excelFileName],
        [],
        ['제목', '작성자', '내용']
      ]);

      excelData.map((data) => {
        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              data.title,
              data.nick_name,
              data.search_descriptions
            ]
          ],
          {origin: -1}
        );
        ws['!cols'] = [
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 450 },
        ]
        return false;
      });
      
    const wb = {Sheets: { data: ws }, SheetNames: ['data']};
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: excelFileType});
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => excelDownload(router)}>엑셀 다운로드</button>
      <div className={styles.contents}>
        {contents.length < 1 ?
        <div className={styles.container}>
          <p style={{fontSize:'1.2rem'}}>검색결과 없음</p>
        </div>
        :
        <>
        {contents.map((val, index) => (
          <CheckAdminContent key={index} json = {{val : val, cookies : cookies, index : index, check : check, router : checkRouter}}/>
        ))}
        </>}
        {check ?
          <CheckAdminPagination pageNumber={pageNumber} setPageNumber={setPageNumber} router={router} />
          :
          <></>
        }
      </div>
    </div>
  )
}
