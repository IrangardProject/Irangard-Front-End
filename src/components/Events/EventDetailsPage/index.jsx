import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import Layout from '../../Layout';
// import PlaceGallery from '../PlaceGallery';
// import PlaceContactInfo from '../PlaceContactInfo';
// import PlaceTags from '../PlaceTags';
// import RoomsList from '../RoomsList';
// import PlaceCosts from '../PlaceCosts';
import Loader from '../../Loader';
import { useGetEvent } from 'src/api/Events';
import { convertNumberToPersian } from '../../../utils/formatters';
import './styles.scss';

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = params.id;
  console.log("this is the id: ", eventId);
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
            <div className="event-detail__rating">
              {/* <Rating dir="ltr" readOnly defaultValue={data.rate} max={5} /> */}
              <div className="event-detail__rating-value">{convertNumberToPersian(data.rate)}</div>
            </div>
          </header>
          <div className="event-detail__gallery-info-wrapper">
            {/* <PlaceGallery className="place-detail__gallery" images={data.images} /> */}
            {/* <PlaceContactInfo className="place-detail__contact-info" contactInfo={data.contactInfo} /> */}
          </div>
          {/* <div className="place-detail__tags">
            <PlaceTags tags={data.tags} />
          */}
          <div className="event-detail__body">
            <div className="event-detail__about-title">درباره رویداد</div>
            <div className="event-detail__about">{data.about}</div>
            {data.tags && (
              <div className="event-detail__tags">
                {/* <EventTags tags={data.tags} /> */}
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EventDetailsPage;
