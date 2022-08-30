import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from 'next/router'

import styles from '../style/Editor.module.css'

export const Editor = ({ onChange, editorLoaded, name, value }) => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const router = useRouter()

  useEffect(() => {
    try {
      editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    } catch {
      router.reload()
    }
  }, []);

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload_image`,
            body,{
            })
            .then((res) => {
              resolve({
                default: res.data.location
              });
            })
            .catch((err) => {
              reject(err);
            })
          });
        });
      }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className={styles.container}>
      {editorLoaded ? (
        <div className={styles.editor}>
            <CKEditor
            type=""
            name={name}
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}

            config={{
              extraPlugins : [uploadPlugin]
            }}
            />
        </div>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}