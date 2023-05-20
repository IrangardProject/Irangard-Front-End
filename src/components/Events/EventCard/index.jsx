import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import { formatDate, convertNumberToPersian, formatPrice, convertGeorgianDateToJalali } from 'src/utils/formatters';
import './styles.scss';
import defaultEventImg2 from 'src/assets/images/defaultEventImg2.jpeg';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { RiLink } from 'react-icons/ri';

function EventCard({ event }) {
  const navigate = useNavigate();
  const eventImg = event.images[0]['image'] ? event.images[0]['image'] : defaultEventImg2;

  const findNumberOfDays = (endDate, startDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    // <div className="event-card">
    //   <img className="event-card__img" src={eventImg} alt={event.title} />
    //   <div className="event-card__left">
    //     <div className="event-card__title">{event.title}</div>
    //     <div className="event-card__date-and-time">
    //       {event.start_date === event.end_date ? (
    //         <p>{convertNumberToPersian(convertGeorgianDateToJalali(event.start_date.toString()))}</p>
    //       ) : (
    //         <p>
    //           از تاریخ {convertNumberToPersian(convertGeorgianDateToJalali(event.start_date.toString()))} تا{' '}
    //           {convertNumberToPersian(convertGeorgianDateToJalali(event.end_date.toString()))}
    //         </p>
    //       )}

    //       <p>
    //         از ساعت {convertNumberToPersian(event.start_time.slice(0, -3))} تا{' '}
    //         {convertNumberToPersian(event.end_time.slice(0, -3))}
    //       </p>
    //     </div>
    //     <Button onClick={() => navigate(`/events/${event.id}`)} className="event-card__more">
    //       جزئیات بیشتر
    //     </Button>
    //   </div>
    // </div>
    <Link className="event-card" to={`/events/${event.id}`}>
      <img className="event-card__img" src={eventImg || defaultEventImg2} alt={event.title} />
      <div className="event-card__content">
        <div className="event-card__title">{event.title}</div>
        {/* <div className="event-card__cost-capacity">
          <div className="event-card__cost">
            <p style={{ display: 'flex', flexDirection: 'row', marginRight: '12px' }}>
              <p style={{ fontSize: '12px', marginLeft: '12px' }}>
                {' '}
                ({findNumberOfDays(event.end_date, event.start_date)} روزه)
              </p>{' '}
              <p style={{ fontWeight: 'bold' }}>{formatPrice(convertNumberToPersian(event.cost))}</p>
              <p style={{ fontSize: '12px', marginRight: '5px', paddingTop: '4px' }}>تومان</p>
            </p>
          </div>
          <div className="event-card__capacity">
            <p style={{ fontSize: '14px', marginRight: '12px' }}>
              ظرفیت تور: {convertNumberToPersian(event.capacity - event.bookers.length)} نفر
            </p>
          </div>
        </div> */}
        <div className="event-card__date">
          <AiOutlineCalendar style={{ fontSize: '20px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }} />
          <span className="event-card__date__text">{formatDate(event.start_date)}</span>
        </div>
        <div className="event-card__time">
          <BiTime style={{ fontSize: '20px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }} />
          <span className="event-card__time__text">
            از ساعت {convertNumberToPersian(event.start_time.slice(0, -3))}
          </span>
        </div>
        {event.website && (
          <div className="event-card__website">
            <RiLink style={{ fontSize: '20px', marginRight: '12px', paddingTop: '4px', marginLeft: '4px' }} />
            <span className="event-card__website__address">{event.website}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default EventCard;
