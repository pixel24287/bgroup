import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from '../style/Slider.module.css'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
export default function Slider() {
  const [sliderData, setSliderData] = useState([])
  useEffect(async() => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/slider/all`)
    setSliderData(data)
  }, [])
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}

        centeredSlides={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}

        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={styles.swiper}
      >
        {sliderData ?
        <>
        {sliderData.map((val, index)=> (
          <SwiperSlide key={index}><Image src={val.url} layout='fill' objectFit='scale-down' /></SwiperSlide>
        ))}
        </>
        :
        <></>}
      </Swiper>
    </div>
  );
}
