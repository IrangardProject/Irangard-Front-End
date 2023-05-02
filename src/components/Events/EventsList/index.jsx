import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconContext } from 'react-icons';
import Loader from 'src/components/Loader';
import apiInstance from '../../../config/axios';
import EventCard from '../EventCard';
import useAuth from '../../../context/AuthContext';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import IranStateKeys from 'src/assets/data/IranStateKeys.json';
import { useMobile, useMobileFilters } from 'src/utils/hooks';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import { TbZoomCancel } from 'react-icons/tb';
import { EventFilters } from './EventFilters';
import { BsFilterRight } from 'react-icons/bs';
import Button from 'src/components/Button';

const EventsList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventProvince, setEventProvince] = useState(searchParams.get('province') || '');
  const [eventCity, setEventCity] = useState(searchParams.get('city') || '');
  const [cities, setCities] = useState([]);
  const [q, setQ] = useState(searchParams.get('title__contains') || '');
  const isMobile = useMobile();
  const isMobileFilters = useMobileFilters();
  const [showFilters, setShowFilters] = useState(true);
  // const filterKeys = {
  //   q: 'title__contains',
  // };
  // const auth = useAuth();
  // const navigate = useNavigate();

  useEffect(() => {
    apiInstance
      .get('/events')
      .then(res => res.data)
      .then(data => {
        setData(data.results);
        setNext(data.next);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
    getSpecialUserEvents();
  }, []);


  useEffect(async () => {
    if (eventProvince) console.log('state', IranStateKeys[eventProvince]);
    setCities(await (await fetch(`/assets/data/cities/${eventProvince?.value ?? IranStateKeys[state]}.json`)).json());
  }, [eventProvince]);

  useEffect(() => {
    let d = searchParams;
    console.log(d);
    if (q) d.set('title__contains', q);
    else if (q === '') d.delete('title__contains');
    if (eventProvince?.label) {
      d.set('province', eventProvince.label);
      if (eventCity?.label) d.set('city', eventCity.label);
      else if (!eventCity) d.delete('city');
    } else if (!eventProvince) {
      d.delete('city');
      d.delete('province');
    }
    for (const [key, value] of d) {
      console.log('the key is: ', key);
      console.log('the value is: ', value);
    }
    setSearchParams(d);
  }, [eventProvince, eventCity]);

  useEffect(() => {
    if (isMobileFilters) setShowFilters(false);
    else setShowFilters(true);
  }, [isMobileFilters]);

  const greenTheme = createTheme({
    palette: {
      primary: {
        main: '#00aa6c',
      },
    },
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  });


  const getSpecialUserEvents = () => {
    const access_token = localStorage.getItem('access-token');
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };

      axios
        .get(`${baseUrl}/accounts/special-users/events`, { headers })
        .then(res => console.log('res :', res))
        .catch(err => console.log('error', err));
    }
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <Navbar />
      <IconContext.Provider value={{ color: '#00aa6c', size: '1.3em' }}>
        {loading && <Loader />}
        {!loading && (
          <div className="search-events">
            <div className="search-events__events-list">
              {isMobileFilters && (
                <div className="search-events__events-list__show-filters">
                  <Button
                    className="search-events__events-list__show-filters__button"
                    variant="text"
                    onClick={() => {
                      if (showFilters) setShowFilters(false);
                      else setShowFilters(true);
                    }}
                  >
                    <p className="search-events__events-list__show-filters__button__text">فیلترها</p>
                    <BsFilterRight />
                  </Button>
                </div>
              )}
              {showFilters && (
                <EventFilters
                  setEventData={setData}
                  clearEventProvince={setEventProvince}
                  clearEventCity={setEventCity}
                />
              )}
              <div className="search-events__events-list__events">
                {data.length > 0 ? (
                  data.map((event, index) => <EventCard key={index} event={event} />)
                ) : (
                  <div className="no-event-wrapper">
                    <div className="no-events">
                      <TbZoomCancel style={{ fontSize: '48px' }} />
                      <h3 className="no-events__title">رویدادی یافت نشد.</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default EventsList;
