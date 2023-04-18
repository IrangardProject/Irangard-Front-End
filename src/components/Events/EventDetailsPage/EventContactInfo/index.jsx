import React from 'react';
import { RiMapPinLine, RiPhoneLine, RiLink, RiTimeLine } from 'react-icons/ri';
import Map from 'src/components/Map';
import './styles.scss';

const EventContactInfo = ({ className, info }) => {
  const { address, x_location: lat, y_location: long } = info;

  return (
    <div className={`event-contact ${className || ''}`}>
      <Map style={{ width: '100%', height: 240 }} defaultLat={lat} defaultLong={long} />
      <a target={'_blank'} href={`https://www.google.com/maps/@${lat},${long},14z`}>
        <button className="event-contact__navigate secondary-btn">مشاهده در گوگل مپ</button>
      </a>
      <div className="event-contact__items">
        {address && (
          <div className="event-contact__item">
            <RiMapPinLine size={24} />
            {address}
          </div>
        )}
        {/* {phone && (
          <div className="event-contact__item">
            <RiPhoneLine size={24} />
            {phone}
          </div>
        )}
        {time && (
          <div className="event-contact__item">
            <RiTimeLine size={24} />
            {time}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EventContactInfo;
