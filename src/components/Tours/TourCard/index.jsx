import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import { formatDate, convertNumberToPersian, formatPrice } from 'src/utils/formatters';
import './style.scss';
import defaultTourImg from 'src/assets/images/defaultTourImg.jpeg';

function TourCard({ tour }) {
  const navigate = useNavigate();
  return (
    <div className="tour-card">
      <img className="tour-card__img" src={tour.image || defaultTourImg} alt={tour.title} />
      <div className="tour-card__left">
        <div className="tour-card__title">{tour.title}</div>
        <div className="tour-card__cost-capacity">
          <div className="tour-card__capacity">
            ظرفیت تور: {convertNumberToPersian(tour.capacity - tour.bookers.length)} نفر
          </div>
          <div className="tour-card__cost">قیمت تور: {formatPrice(convertNumberToPersian(tour.cost))} تومان</div>
        </div>
        <div className="tour-card__date">
          <div className="tour-card__start">تاریخ رفت: {formatDate(tour.start_date)}</div>
          <div className="tour-card__end">تاریخ برگشت: {formatDate(tour.end_date)}</div>
        </div>
        <Button onClick={() => navigate(`/tours/${tour.id}`)} className="tour-card__more">
          جزئیات بیشتر
        </Button>
      </div>
    </div>
  );
}

export default TourCard;
