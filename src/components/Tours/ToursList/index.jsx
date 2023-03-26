import React, { useEffect, useState } from 'react';
import Layout from 'src/components/Layout';
import Loader from 'src/components/Loader';
import Button from 'src/components/Button';
import apiInstance from '../../../config/axios';
import TourCard from '../TourCard';
import useAuth from '../../../context/AuthContext';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';

function ToursList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    apiInstance
      .get('/tours')
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
      getSpecialUserTours();
  }, []);

  

  const getSpecialUserTours = () => {
    const access_token = localStorage.getItem('access-token');
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };
  
      axios.get(`${baseUrl}/accounts/special-users/tours`, { headers })
        .then(res => console.log('res :', res))
        .catch(err => console.log('error', err));
    }
  };
  
  return (
    <Layout title="لیست تورها">
      {loading && <Loader />}
      {!loading && (
        <div className="tours-list">
          <h1 className="tours-list__title">لیست تورها</h1>
          {auth.isSpecial && (
            <Button onClick={() => navigate('/tours/new')} className="tours-list__add-tour">
              افزودن تور جدید
            </Button>
          )}
          <div className="tours-list__tours">
            {data.map((tour, index) => (
              <TourCard key={index} tour={tour} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ToursList;
