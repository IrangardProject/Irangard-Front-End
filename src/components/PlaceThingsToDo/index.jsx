import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@mui/material';
import apiInstance from 'src/config/axios';
import Layout from 'src/components/Layout';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Loader from 'src/components/Loader';
import RichText from 'src/components/RichText';
import { convertNumberToPersian, formatDate, formatPrice } from 'src/utils/formatters';
import useAuth from 'src/context/AuthContext';
import './styles.scss';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams, useLocation } from 'react-router-dom';
import TourSlider from './TourSlider';
import EventSlider from './EventSlider';
import PlaceCard from './PlaceCard';
import { TbZoomCancel } from 'react-icons/tb';

const PlaceThingsToDo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const [whereToParam, setWhereToParam] = useState(urlSearchParams.get('where-to'));

  const [availableTours, setAvailableTours] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    apiInstance
      .get(`/place_trivia/province/${whereToParam}`)
      .then(res => res.data)
      .then(data => {
        console.log('the feteched data from place trivia: ', data);
        setAvailableTours(data.tours);
        setAvailableEvents(data.events);
        setAvailablePlaces(data.places);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const seeAllPlacesHandler = () => {
    navigate(`/Search?province=${whereToParam}`);
  };

  const seeAllToursHandler = () => {
    navigate(`/tours?province=${whereToParam}`);
  };

  const seeAllEventsHandler = () => {
    navigate(`/events?province=${whereToParam}`);
  };

  return (
    <Layout title="ایران‌گردی">
      {loading && <Loader />}
      {!loading && availableEvents.length === 0 && availablePlaces.length === 0 && availableTours.length === 0 && (
        <>
          <div className="things-to-do__header">
            <div className="things-to-do__header__title">
              <h2>ایران‌گردی در {whereToParam}</h2>
            </div>
          </div>
          <hr className="things-to-do__hr" />
          <div className="no-available-things-to-do-wrapper">
            <div className="no-available-things-to-do">
              <TbZoomCancel style={{ fontSize: '88px', color: '#04aa6c' }} />
              <h3 className="no-available-things-to-do__title">موردی یافت نشد!</h3>
            </div>
          </div>
        </>
      )}
      {/* availableEvents.length !== 0 && 
      availablePlaces.length !== 0 && 
      availableTours.length !== 0 &&  */}
      {!loading && (
        <div className="things-to-do">
          <div className="things-to-do__header">
            <div className="things-to-do__header__title">
              <h2>ایران‌گردی در {whereToParam}</h2>
            </div>
          </div>
          <hr className="things-to-do__hr" />
          <div className="things-to-do__content">
            {availableTours.length > 0 && (
              <>
                <div className="things-to-do__content__tours">
                  <h5 onClick={seeAllToursHandler}>مشاهده همه</h5>

                  <h3>راه‌های سفر به {whereToParam}</h3>
                  <div className="things-to-do__content__tours__slider">
                    <TourSlider tours={availableTours} />
                  </div>
                </div>
                <hr className="things-to-do__hr" />
              </>
            )}
            {availablePlaces.length > 0 && (
              <>
                <div className="things-to-do__content__places">
                  <h5 onClick={seeAllPlacesHandler}>مشاهده همه</h5>
                  <h3>جاذبه‌های دیدنی {whereToParam}</h3>
                  <div className="things-to-do__content__places__cards">
                    {availablePlaces.length > 3
                      ? availablePlaces.slice(0, 3).map(place => <PlaceCard place={place} />)
                      : availablePlaces.map(place => <PlaceCard place={place} />)}
                  </div>
                </div>
                <hr className="things-to-do__hr" />
              </>
            )}

            {availableEvents.length > 0 && (
              <>
                <div className="things-to-do__content__events">
                  <h5 onClick={seeAllEventsHandler}>مشاهده همه</h5>

                  <h3>رویداد‌های مهم در {whereToParam}</h3>
                  <div className="things-to-do__content__events__slider">
                    <EventSlider events={availableEvents} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlaceThingsToDo;
