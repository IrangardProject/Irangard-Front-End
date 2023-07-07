import React, { useEffect,useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import Layout from '../../Layout';
import PlaceGallery from '../PlaceGallery';
import PlaceContactInfo from '../PlaceContactInfo';
import PlaceTags from '../PlaceTags';
import RoomsList from '../RoomsList';
import PlaceCosts from '../PlaceCosts';
import Loader from '../../Loader';
import { useGetPlace } from '../../../api/place';
import { convertNumberToPersian } from '../../../utils/formatters';
import './style.scss';
import ShareIcon from '@mui/icons-material/Share';
import ShareModal from '../../ShareModal/shareModal';


const PlaceDetailPage = () => {
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const params = useParams();
  const { placeId } = params;

  const { error, isLoading, data } = useGetPlace(placeId);
  if (error) {
    return <Navigate to={'/notFound'} />;
  }
  // const [rateValue, setRateValue] = React.useState(data.rate);
  console.log("this is the data: ", data);
  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };
  const calculateAverageRating = () => {
    let sum = 0;
    
  }

  // const rateChangeHandler = (newRate) => {
  //   setRateValue(newRate);  
  // }

  return (
    <Layout>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="place-detail">
          <header className="place-detail__header">
            <section className='titleandicon'>
              <h2>{data.title}</h2>
              <div className='share-icon-container'>
                  <ShareIcon 
                    onClick = {handleOpen}
                    sx={{
                      marginRight: '20px',
                      color: 'green',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                      padding: '2px 1px',
                    }}
                  />
                  <span className="tooltip-text">به اشتراک گذاشتن مکان</span>
              </div>
            </section>
            <div className="place-detail__rating">
              <Rating dir="ltr" readOnly defaultValue={data.rate} max={5} />
              <div className="place-detail__rating-value">{convertNumberToPersian(data.rate)}</div>
            </div>
            {/* <div className="add-experience__rating">
              <label className="add-experience__rating-label">امتیاز: {convertNumberToPersian(rateValue)}</label>
              <div className="add-experience__rating-choose">
                <Rating
                  value={rateValue}
                  onChange={(event, newValue) => {
                    // setRateValue(newValue);
                    
                  }}
                />
              </div>
            </div> */}
          </header>
          <div className="place-detail__gallery-info-wrapper">
            <PlaceGallery className="place-detail__gallery" images={data.images} />
            <PlaceContactInfo className="place-detail__info" info={data.contact} />
          </div>
          <div className="place-detail__body">
            <h3 className="place-detail__about-title">درباره {data.title}</h3>
            <p className="place-detail__about-description">{data.description}</p>
            {data.tags && data.tags.length > 0 && <PlaceTags tags={data.tags} />}
            {data.rooms && data.rooms.length > 0 && <RoomsList rooms={data.rooms} />}
            <PlaceCosts costs={data.optional_costs} isFree={data.is_free} />
          </div>
          <ShareModal 
            open={editProfileModalOpen}
            handleClose={() => setEditProfileModalOpen(false)}
            shareType = {"مکان"}
          />
        </div>
      )}
    </Layout>
  );
};

export default PlaceDetailPage;
