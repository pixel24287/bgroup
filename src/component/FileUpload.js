import React, {useCallback, useState, useEffect} from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/router'
import Image from 'next/image'
import jwtDecode from 'jwt-decode';
import Plus from '../icons/plus.svg'

import axios from 'axios';

import styles from '../style/FileUpload.module.css'

export const FileUpload = ({route}) => {
    const [files, setFiles] = useState([])
    const router = useRouter()
    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles[0].size > 5 * 1024 * 1024) {
            alert('용량제한 5MB 입니다.');
            router.reload()
        }
        // 사용자가 올린 정보를 확인해야 하므로 일단 서버로 전송합니다.
        // 제목 같은 건 폼을 제출한 이후에 달아주도록 합시다.
    
        // 폼데이터 구성
        const formData = new FormData();
        formData.append("files", acceptedFiles[0]);
    
        // 배포시에는 지워줘야 합니다.
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/${route}`, formData, {
                header: {
                "content-type": "multipart/form-data",
                },
            }).then((res) => {
                setFiles()
                alert('등록되었습니다.')
                route === 'slider' ? router.reload() : router.push(`/${route}`)
            });
    }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
      const InputProps = {
        ...getInputProps(),
        multiple: false,
        accept: "image/gif, image/jpg, image/jpeg",
      };
    
      const RootProps = {
        ...getRootProps(),
      };
    
      return (
        <div className={styles.container}>
            <div {...RootProps} multiple={false} className={styles.form}>
            <input {...InputProps} />
            {isDragActive ? (
                <div className={styles.upload_image}>
                    <Image src={Plus} layout='fill' />
                </div>
            ) : (
                <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                <div style={{ fontSize: "3em", marginBottom: "5px" }}>
                    <i className="fas fa-file-upload"></i>
                </div>
                <div>이미지 드랍 or 클릭</div>
                </div>
            )}
            </div>
        </div>
    );
};