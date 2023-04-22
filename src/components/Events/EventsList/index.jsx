import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout';
import Loader from 'src/components/Loader';
import Button from 'src/components/Button';
import apiInstance from '../../../config/axios';
import EventCard from '../EventCard';
import useAuth from '../../../context/AuthContext';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';

function EventsList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    apiInstance
      .get('/events')
      .then(res => res.data)
      .then(data => {
        console.log(data);
        setData(data.results);
        setNext(data.next);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
      getSpecialUserEvents();
  }, []);

  

  const getSpecialUserEvents = () => {
    const access_token = localStorage.getItem('access-token');
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };
  
      axios.get(`${baseUrl}/accounts/special-users/events`, { headers })
        .then(res => console.log('res :', res))
        .catch(err => console.log('error', err));
    }
  };
  
  return (
    <Layout title="لیست رویدادها">
      {loading && <Loader />}
      {!loading && (
        <div className="events-list">
          <h1 className="events-list__title">لیست رویدادها</h1>
          {auth.isSpecial && (
            <Button onClick={() => navigate('/events/new')} className="events-list__add-event">
              افزودن رویداد جدید
            </Button>
          )}
          <div className="events-list__events">
            {data.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default EventsList;
