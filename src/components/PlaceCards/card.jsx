import React from 'react';
import { Link } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';
import defaultPic from 'src/assets/images/defaulePlaceImg.jpg';
import './style.scss';

const PlaceCard = ({ placeData }) => {
  const { id, imgSrc, title, description } = placeData;
  console.log('the imgsrc:', imgSrc);
  return (
    <>
      <Link className="place-card" to={`/places/${id}`}>
        <div className="place-card-wrapper">
          <div className="place-card__img-wrapper">
            <img className="place-card__img" src={imgSrc ?? defaultPic} alt={title} />
          </div>
          <div className="place-card__content">
            <h3 className="place-card__title">{title}</h3>
            <p className="place-card__description">
              {description.length > 300 ? description.slice(0, 240) + '...' : description}
            </p>
            {/* <div className="place-card__experiences">تجربه های مربوط به این مکان</div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default PlaceCard;
