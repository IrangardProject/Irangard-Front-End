import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiInstance from "../../config/axios";
import { baseUrl } from "../../utils/constants";
import { useEffect } from "react";
import EventCard from './EventCard'

const PopularEvent = () => {
    const [popularEvents,setPopularEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log('events',popularEvents);
    const getPopularEvents = async () =>{
        const {data} =await apiInstance.get(`${baseUrl}/events/recommended_events/`)
        setPopularEvents(data);
    }
    console.log('popularEvents',popularEvents);
    useEffect(() => {
        if (loading) {
          getPopularEvents();
        }
      },[])

    return (
        <div className="popularEvent">
            <h2>رویداد های پرطرفدار</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={-40}
                navigation
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
                {popularEvents.map((event,index) =>{
                    return (
                        <SwiperSlide key={index}>
                            <EventCard event={event} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
 
export default PopularEvent;