import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './index.scss';
// import { Link } from 'react-router-dom';
import { baseUrl } from 'src/utils/constants';
import { useEffect } from 'react';
import axios from 'axios';
import TourCard from './TourCard';




const RecommendedTour = () => {
  const [recommendedTour,setRecommendedTour] = useState([])
  const [loading, setLoading] = useState(true);
  // console.log('events',events);

  const getAllRecommen = async() =>{
    const {data} = await axios.get(`${baseUrl}/tours/recommended-tours`)
    setRecommendedTour(data.results)
  }

  useEffect(() => {
    if (loading) {
      getAllRecommen();
    }
  },[])

  return (
    <div className='tourRecomended'>
      <h2>تور های ایرانگرد</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        spaceBetween={-40}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop
        speed={800}
        breakpoints={{
            600: {
                slidesPerView: 2,
            },
            900: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            }
        }}
      >
        {recommendedTour.map((tour, index) => (
          <SwiperSlide key={index}>
            <TourCard tour={tour} />
          </SwiperSlide>
        ))}
        <div className="swiper-button-next swiper-button-white"></div>
        <div className="swiper-button-prev swiper-button-white"></div>
      </Swiper>
    </div>
  );
};

export default RecommendedTour;
