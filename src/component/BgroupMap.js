import React, { useState } from 'react'
import { Map, MapMarker } from "react-kakao-maps-sdk"

import styles from '../style/BgroupMap.module.css'

export const BgroupMap = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>찾아오시는 길</p>
      <Map
          center={{ lat: 35.9800617, lng: 126.6779892 }}
          className={styles.map}
          >
          <MapMarker position={{ lat: 35.9800617, lng: 126.6779892 }}>
          </MapMarker>
      </Map>    
  </div>
  )
}
