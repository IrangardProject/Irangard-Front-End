import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import Layout from '../../Layout';
import EventGallery from './EventGallery';
import EventContactInfo from './EventContactInfo';
import EventTags from './EventTags';
import Loader from '../../Loader';
import { useGetEvent } from 'src/api/Events';
import { convertNumberToPersian, convertGeorgianDateToJalali } from '../../../utils/formatters';
import './styles.scss';

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = params.id;
  const { error, isLoading, data } = useGetEvent(eventId);
  if (error) {
    return <Navigate to={'/notFound'} />;
  }
  console.log('this is the data: ', data);
  return (
    <Layout>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="event-detail">
          <header className="event-detail__header">
            <h2>{data.title}</h2>
          </header>
          <div className="event-detail__gallery-info-wrapper">
            <EventGallery className="event-detail__gallery" images={data.images} />
            <EventContactInfo className="event-detail__contact-info" info={data} />
          </div>

          <div className="event-detail__body">
            <div className="event-detail__description">
              <h3>درباره رویداد</h3>
              <p>{data.description}</p>
            </div>
            <div className="event-detail__date">
              <h3>تاریخ برگزاری رویداد</h3>
              {data.start_date === data.end_date ? (
                <p>{convertGeorgianDateToJalali(data.start_date.toString())}</p>
              ) : (
                <p>از تاریخ
                  {convertGeorgianDateToJalali(data.start_date.toString())} تا{' '}
                  {convertGeorgianDateToJalali(data.end_date.toString())}
                </p>
              )}
            </div>
            <div className="event-detail__time">
              <h3>زمان برگزاری رویداد</h3>
              <p>از ساعت {data.start_time.slice(0, -3)} تا {data.end_time.slice(0, -3)}</p>
            </div>
            {data.tags && (
              <div className="event-detail__available-tags">
                <EventTags tags={data.tags} />
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EventDetailsPage;
