import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import { formatDate, convertNumberToPersian, formatPrice, convertGeorgianDateToJalali } from 'src/utils/formatters';
import './styles.scss';
import defaultEventImg2 from 'src/assets/images/defaultEventImg2.jpeg';

function EventCard({ event }) {
  const navigate = useNavigate();
  const eventImg = event.images[0]['image'] ? event.images[0]['image'] : defaultEventImg2;
  return (
    <div className="event-card">
      <img className="event-card__img" src={eventImg} alt={event.title} />
      <div className="event-card__left">
        <div className="event-card__title">{event.title}</div>
        <div className="event-card__date-and-time">
          {event.start_date === event.end_date ? (
            <p>{convertNumberToPersian(convertGeorgianDateToJalali(event.start_date.toString()))}</p>
          ) : (
            <p>
              از تاریخ {convertNumberToPersian(convertGeorgianDateToJalali(event.start_date.toString()))} تا{' '}
              {convertNumberToPersian(convertGeorgianDateToJalali(event.end_date.toString()))}
            </p>
          )}

          <p>
            از ساعت {convertNumberToPersian(event.start_time.slice(0, -3))} تا{' '}
            {convertNumberToPersian(event.end_time.slice(0, -3))}
          </p>
        </div>
        <Button onClick={() => navigate(`/events/${event.id}`)} className="event-card__more">
          جزئیات بیشتر
        </Button>
      </div>
    </div>
  );
}

export default EventCard;
