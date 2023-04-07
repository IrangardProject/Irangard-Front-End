import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultXpImg from '../../assets/images/defaultXpImg.png';
import avatar from '../../assets/images/avatar.png';
import './style.scss';

const ExperienceCard = ({ id, imgSrc, title, description, userImgSrc, userName }) => {
  return (
    <Link to={`/experiences/${id}`} className="experience-card">
      <img src={imgSrc || defaultXpImg} alt={title} className="experience-card__img" />
      <div className="experience-card__rating-wrapper"></div>
      <h3 className="experience-card__title">{title.length > 20 ? title.slice(0, 20) + '...' : title}</h3>
      <p className="experience-card__description">
        {description.length > 40 ? description.slice(0, 40) + '...' : description}
      </p>
      <Link to={`/profile/${userName}`}>
        <div className="experience-card__footer">
          <img src={userImgSrc || avatar} alt={userName} className="experience-card__user-img" />
          <p className="experience-card__user-name">{userName.slice(0, 20)}</p>
        </div>
      </Link>
    </Link>
  );
};

export default ExperienceCard;
