import React from 'react';
import { RiMapPinLine, RiPhoneLine, RiLink, RiTimeLine } from 'react-icons/ri';
import Map from 'src/components/Map';
import { convertNumberToPersian } from 'src/utils/formatters';
import './styles.scss';

const TourContactInfo = ({ className, info }) => {
  const {
    // address,
    x_location: lat,
    y_location: long,
    phone,
    province,
    city,
    // website,
  } = info;
  console.log('the info: ', info);
  return (
    <div className={`tour-contact ${className || ''}`}>
      <Map style={{ width: '100%', height: 240 }} defaultLat={lat} defaultLong={long} />
      <a target={'_blank'} href={`https://www.google.com/maps/@${lat},${long},14z`}>
        <button className="tour-contact__navigate secondary-btn">مشاهده در گوگل مپ</button>
      </a>
      <div className="tour-contact__items">
        <div className="event-contact__item">
          <RiMapPinLine size={24} />
          {province}، {city}
        </div>
        {phone && (
          <div className="tour-contact__item">
            <RiPhoneLine size={24} />
            {convertNumberToPersian(phone)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourContactInfo;
