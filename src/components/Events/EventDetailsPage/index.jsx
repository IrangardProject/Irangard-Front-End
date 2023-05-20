import React, { useEffect,useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import Layout from '../../Layout';
import EventGallery from './EventGallery';
import EventContactInfo from './EventContactInfo';
import ByUser from './ByUser';
import EventTags from './EventTags';
import Loader from '../../Loader';
import { useGetEvent } from 'src/api/Events';
import { convertNumberToPersian, convertGeorgianDateToJalali } from '../../../utils/formatters';
import { BsCalendarDate } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import './styles.scss';
import ShareIcon from '@mui/icons-material/Share';
import ShareModal from '../../ShareModal/shareModal';

const EventDetailsPage = () => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const params = useParams();
  const eventId = params.id;
  const { error, isLoading, data } = useGetEvent(eventId);
  if (error) {
    return <Navigate to={'/notFound'} />;
  }
  // console.log('this is the data: ', data);
  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };
  return (
    <Layout>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="event-detail">
          <header className="event-detail__header">
            <h2>{data.title}</h2>
              <div className='share-icon-container'>
              <ShareIcon
                onClick={handleOpen}
              sx={{
                marginRight: '20px',
                color: 'green',
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                padding: '2px 1px',
              }}/>
            <span className="tooltip-text">به اشتراک گذاشتن رویداد</span>
            </div>
          </header>
          <div className="event-detail__gallery-info-wrapper">
            <EventGallery className="event-detail__gallery" images={data.images} />
            <EventContactInfo className="event-detail__contact-info" info={data} />
          </div>
          <ByUser />

          <div className="event-detail__body">
            <div className="event-detail__date-and-time">
              <div className="event-detail__date-and-time__icon">
                <BsCalendarDate size={24} />
              </div>
              <div className="event-detail__date-and-time__text">
                <h3>زمان و تاریخ برگزاری رویداد</h3>
                {data.start_date === data.end_date ? (
                  <p>{convertNumberToPersian(convertGeorgianDateToJalali(data.start_date.toString()))}</p>
                ) : (
                  <p>
                    از تاریخ
                    {convertNumberToPersian(convertGeorgianDateToJalali(data.start_date.toString()))} تا{' '}
                    {convertNumberToPersian(convertGeorgianDateToJalali(data.end_date.toString()))}
                  </p>
                )}

                <p>
                  از ساعت {convertNumberToPersian(data.start_time.slice(0, -3))} تا{' '}
                  {convertNumberToPersian(data.end_time.slice(0, -3))}
                </p>
              </div>
            </div>
            <div className="event-detail__description">
              <div className="event-detail__description__icon">
                <MdOutlineDescription size={24} />
              </div>
              <div className="event-detail__description__text">
                <h3>درباره رویداد</h3>
                <p>{data.description}</p>
              </div>
            </div>
            {data.tags && (
              <div className="event-detail__available-tags">
                <EventTags tags={data.tags} />
              </div>
            )}
          </div>
          <ShareModal 
            open={editProfileModalOpen}
            handleClose={() => setEditProfileModalOpen(false)}
            shareType={"رویداد"}
          />
        </div>
      )}
    </Layout>
  );
};

export default EventDetailsPage;
