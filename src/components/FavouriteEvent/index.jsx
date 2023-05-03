import { useEffect, useState } from "react";
import apiInstance from "../../config/axios";
import { baseUrl } from "../../utils/constants";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Rating,
    Typography,
  } from "@mui/material";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./DoctorSwiperStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import EventCard from "./EventCard";

const FavouriteEvents = () => {
    console.log('we are in favourite events page');
    const [events,setEvents] = useState([]);
    // console.log('events',events);
    console.log('events',events);
    
    useEffect(() => {
        const getAllEvents = async() =>{
            const response = await  apiInstance.get(`${baseUrl}/events/`)
            try {
                // console.log('response is ',response.data);
                setEvents(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllEvents()
    },[])
    
    return (
        <div className="eventContainter">
            <h2>رویدادهای مورد علاقه</h2>
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
                {events.map((event,index) =>(
                    <SwiperSlide key={index}>
                        <EventCard doctor = {event} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
 
export default FavouriteEvents;