import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultXpImg from '../../assets/images/defaultXpImg.png';
import avatar from '../../assets/images/avatar.png';
import './styles.scss';
import { Typography } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {convertTimeToPersian} from '../../utils/formatters'
const ExperienceCard = ({start_time,organizer, city, id, imgSrc, title, description, userImgSrc, userName }) => {
  console.log('imgSrc: ', imgSrc);
  return (
    <Link to={`/events/${id}`} className="experience-card">
      <img src={imgSrc} alt={title} className="experience-card__img" />
      <div className="experience-card__rating-wrapper"></div>
      <h3 className="experience-card__title">{ title}</h3>
      <p className="experience-card__description">      
      </p>
      <Typography variant="body2" sx={{
        fontSize:"12px",
        marginBottom:"10px",
        display:"flex"
        }}>
          <div className='experience-card__location'>
            <PlaceOutlinedIcon color="primary" sx={{fontSize:"15px"}}/>
            <section 
            className='experience-card__section' 
            >
              <span  >   محل برگزاری  : &nbsp; </span> {city}
            </section>
          </div>
      </Typography>
      <Typography variant="body2" sx={{
        fontSize:"12px",
        marginBottom:"10px",
        display:"flex"
      }}>
        <div className='experience-card__start_time'>
          <DateRangeIcon color="primary" sx={{fontSize:"15px"}}/>
          <section
            className='experience-card__section'
          >
            <span >  ساعت شروع : &nbsp; </span>{ convertTimeToPersian(start_time)}
          </section>
        </div>
      </Typography>
      <Link to={`/events/${id}`}>
        <div className="experience-card__footer">
          <Typography variant="body2" sx={{
            fontSize:"12px",
            marginBottom:"10px",
            display:"flex"
          }}>
              <PeopleIcon color="primary" sx={{fontSize:"15px"}}/>
              <section 
                className='experience-card__section'
              >
                <span >  برگزارکننده : &nbsp; </span> {organizer.length > 16 ? organizer.slice(0, 16) + '...' : organizer} 
              </section>
          </Typography>
        </div>
      </Link>
    </Link>
  );
};

export default ExperienceCard;
