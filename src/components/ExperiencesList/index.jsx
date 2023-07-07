import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiChat3Line, RiHeartFill, RiMapPinLine, RiTimeLine } from 'react-icons/ri';
import { Rating } from '@mui/material';
import Button from '../Button';
import { convertNumberToPersian, formatDate } from '../../utils/formatters';
import defaultXpImg from '../../assets/images/defaultXpImg.png';
import './style.scss';
import defaultProfileImg from '../../assets/images/avatar.png';

function ExperiencesList({ experiences, city, label }) {
  const navigate = useNavigate();
  return (
    <div className="experiences">
      {/* <h1 className="experiences__title">{label ? label : city ? `تجربه‌های شهر ${city}` : 'تجربه‌ها'}</h1> */}
      <div className="experiences__list">
        {experiences.length === 0 && <p className="experiences__no-experience">هیچ تجربه‌ای پیدا نشد.</p>}
        {experiences.map(xp => (
          <div key={xp.id} className="experience-list-card">
            <div className="experience-list-card__right">
              <img className="experience-list-card__img" src={xp.image || defaultXpImg} alt={xp.title} />
              <div className="experience-list-card__info">
                <h2 className="experience-list-card__title">{xp.title}</h2>
                <div className="experience-list-card__place-rate">
                  <p className="experience-list-card__place">
                    <RiMapPinLine size={20} />
                    {convertNumberToPersian(xp.place_title)}
                  </p>
                  <div className="experience-list-card__rating">
                    <Rating dir="ltr" readOnly precision={0.1} defaultValue={xp.rate} max={5} />
                    <div className="experience-list-card__rating-value">{convertNumberToPersian(xp.rate)}</div>
                  </div>
                </div>
                {xp.summary && (
                  <p className="experience-list-card__summary">
                    {xp.summary.slice(0, xp.summary.length > 120 ? 120 : xp.summary.length)}...
                  </p>
                )}
                <div className="experience-list-card__stats">
                  <div className="experience-list-card__comments">
                    <RiChat3Line size={20} /> {convertNumberToPersian(xp.comment_number)}
                  </div>
                  <div className="experience-list-card__likes">
                    <RiHeartFill size={20} />
                    {convertNumberToPersian(xp.like_number)}
                  </div>
                  <div className="experience-list-card__date">
                    <RiTimeLine size={20} />
                    {formatDate(xp.date_created)}
                  </div>
                </div>
              </div>
            </div>
            <div className="experience-list-card__author">
              <Link to={`/profile/${xp.user_username}`}>
                <div className="experience-list-card__author-info">
                  <img
                    className="experience-list-card__author-img"
                    src={xp.user_image || defaultProfileImg}
                    alt={xp.user_username}
                  />
                  <p className="experience-list-card__author-name">{xp.user_username}</p>
                </div>
              </Link>
              <Button className="experience-list-card__continue" onClick={() => navigate(`/experiences/${xp.id}`)}>
                ادامه مطلب
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperiencesList;
