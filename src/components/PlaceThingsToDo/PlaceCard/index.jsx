import React from 'react';
import { Link } from 'react-router-dom';
import { convertNumberToPersian } from 'src/utils/formatters';
import './styles.scss';
// import defaultPlaceImg from 'src/assets/images/defaultPlaceImg.jpg';
import { IoLocationOutline } from 'react-icons/io5';
import { AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import { baseUrl } from '../../../utils/constants';

const PlaceCard = ({ place }) => {
  return (
    <Link className="available-place-card" to={`/places/${place.id}`}>
      <img className="available-place-card__img" src={place.images[0] || null} alt={place.title} />
      <div className="available-place-card__content">
        <div className="available-place-card__title">{place.title}</div>

        {place.contact.phone && (
          <div className="available-place-card__phone">
            <AiOutlinePhone style={{ fontSize: '25px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }} />
            <p className="available-place-card__phone__text">{convertNumberToPersian(place.contact.phone)}</p>
          </div>
        )}
        {place.contact.instagram && (
          <div className="available-place-card__instagram">
            <AiOutlineInstagram
              style={{ fontSize: '25px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }}
            />
            <p className="available-place-card__instagram__text">{place.contact.instagram}</p>
          </div>
        )}
        <div className="available-place-card__address">
          <IoLocationOutline style={{ fontSize: '25px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }} />
          <p className="available-place-card__address__text">
            {place.contact.address.length > 25 ? place.contact.address.slice(0, 25) + '...' : place.contact.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
