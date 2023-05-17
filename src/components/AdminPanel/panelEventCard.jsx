import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import { formatDate, convertNumberToPersian, formatPrice } from 'src/utils/formatters';
import './panelEventCard.scss';
import defaultTourImg from 'src/assets/images/defaultTourImg.jpeg';
import { AiOutlineCalendar } from 'react-icons/ai';
import axios from 'axios';
import { baseUrl } from '../../utils/constants';
import apiInstance from '../../config/axios';

const PanelEventCard = ({ tour }) => {
  console.log('events is :' , tour);
  console.log();
  const findNumberOfDays = (endDate, startDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const acceptTour = (id) => {
    const access_token = localStorage.getItem('access-token');
    if (access_token) {
      console.log(id);
      const headers = {
        Authorization: `JWT ${access_token}`,
      };
      console.log('headers: ', headers);
      apiInstance
        .put(`/events/${id}/admin_acceptance/`, {}, { headers })
        .then((res) => {
          console.log(res);
          reloadPage();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const reloadPage = () => {
    window.location.reload(); // بازنشانی صفحه
  };
  
  return (
    <div className="tour-card" >
      <img className="tour-card__img" src={tour.image || defaultTourImg} alt={tour.title} />
      <div className="tour-card__content">
        <div className="tour-card__title">{tour.title}</div>
        <div className="tour-card__cost-capacity">
          <div className="tour-card__cost">
            <p style={{ display: 'flex', flexDirection: 'row', marginRight: '12px' }}>
              <p style={{ fontSize: '12px', marginLeft: '12px' }}>
                {' '}
                {/* ({findNumberOfDays(tour.end_date, tour.start_date)} روزه) */}
              </p>{' '}
              {/* <p style={{ fontWeight: 'bold' }}>{formatPrice(convertNumberToPersian(tour.cost))}</p> */}
              <p style={{ fontSize: '12px', marginRight: '5px', paddingTop: '4px' }}>تومان</p>
            </p>
          </div>
          <div className="tour-card__capacity">
            <p style={{ fontSize: '14px', marginRight: '12px' }}>
              {/* ظرفیت تور: {convertNumberToPersian(tour.capacity - tour.bookers.length)} نفر */}
            </p>
          </div>
        </div>
        <div className="tour-card__date">
          <AiOutlineCalendar style={{ fontSize: '20px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }} />
          {/* <span className="tour-card__date__text">{formatDate(tour.start_date)}</span> */}
        </div>
        <div className='tour-card__buttons'>
          <button onClick={() => acceptTour(tour.id) } className='tour-card__buttons__accept'>
            پذیرفتن
          </button>
          <button className='tour-card__buttons__reject'>
            رد کردن
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelEventCard;
