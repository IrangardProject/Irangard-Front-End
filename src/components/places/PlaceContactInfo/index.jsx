import React from 'react';
import { RiMapPinLine, RiPhoneLine, RiLink, RiMailLine, RiInstagramLine, RiTimeLine } from 'react-icons/ri';
import Map from '../../Map';
import './style.scss';

const demo = {
  address: 'آدرس',
  lat: 35.699739,
  long: 51.338097,
  phone: '09123456789',
  time: 'هر روز',
  email: 'example@gmail.com',
  website: 'www.example.com',
  instagram: 'instagram',
};
const PlaceContactInfo = ({ className, info }) => {
  const { address, x_location: lat, y_location: long, phone, time, email, website, instagram } = info;
  console.log("the website is: ", website)
  return (
    <div className={`place-contact ${className || ''}`}>
      <Map style={{ width: '100%', height: 240 }} defaultLat={lat} defaultLong={long} />
      <a target={'_blank'} href={`https://www.google.com/maps/@${lat},${long},14z`}>
        <button className="place-contact__navigate secondary-btn">مشاهده در گوگل مپ</button>
      </a>
      <div className="place-contact__items">
        {address && (
          <div className="place-contact__item">
            <RiMapPinLine size={24} />
            {address}
          </div>
        )}
        {phone && (
          <div className="place-contact__item">
            <RiPhoneLine size={24} />
            {phone}
          </div>
        )}
        {time && (
          <div className="place-contact__item">
            <RiTimeLine size={24} />
            {time}
          </div>
        )}
        {email && (
          <div className="place-contact__item">
            <RiMailLine size={24} />
            {email}
          </div>
        )}
        {website && (
          <div className="place-contact__item place-contact__website">
            <RiLink size={24} />
            <a href={`https://${website}`} target="_blank">
              {website}
            </a>
          </div>
        )}
        {instagram && (
          <div className="place-contact__item place-contact__address">
            <RiInstagramLine size={24} />
            <a href={`https://instagram.com/${instagram}`} target="_blank">
              {instagram}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceContactInfo;
