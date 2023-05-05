import React, { useEffect, useState, useRef } from 'react';
import Loader from 'src/components/Loader';
import apiInstance from '../../../config/axios';
import TourCard from '../TourCard';
import useAuth from '../../../context/AuthContext';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import { TbZoomCancel } from 'react-icons/tb';
import { useMobile, useMobileFilters } from 'src/utils/hooks';
import { useSearchParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconContext } from 'react-icons';
import TourFilters from './TourFilters';
import { BsFilterRight } from 'react-icons/bs';
import Button from 'src/components/Button';

function ToursList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [tourType, setTourType] = useState(searchParams.get('tour_type') || '');
  // const [tourStartDate, setTourStartDate] = useState(searchParams.get('start_date') || '');
  // const [tourEndDate, setTourEndDate] = useState(searchParams.get('end_date') || '');
  const isMobile = useMobile();
  const isMobileFilters = useMobileFilters();
  const [showFilters, setShowFilters] = useState(true);

  const filterKeys = {
    q: 'title__contains',
  };
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

  // const updateResult = async e => {
  //   if (e) e.preventDefault();
  //   let query = '';
  //   for (const [key, value] of searchParams) query += `${filterKeys[key] ?? key}=${value}&`;

  //   setLoading(true);
  //   await apiInstance.get(`tours/?${query}`).then(res => {
  //     console.log('the result after sending the query is: ', res.data);
  //     setData(res.data['results']);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   let d = searchParams;
  //   console.log(d);
  //   if (q) d.set('title__contains', q);
  //   else if (q === '') d.delete('title__contains');

  //   for (const [key, value] of d) {
  //     console.log('the key is: ', key);
  //     console.log('the value is: ', value);
  //   }
  //   setSearchParams(d);
  // }, []);

  // const handleIsOptionEqualToValue = (option, val) => {
  //   if (val) {
  //     if (val.label != option.label) return false;
  //   }
  //   return true;
  // };

  useEffect(() => {
    if (isMobileFilters) setShowFilters(false);
    else setShowFilters(true);
  }, [isMobileFilters]);

  const yellowTheme = createTheme({
    palette: {
      primary: {
        main: '#feb714',
      },
    },
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  });

  const getSpecialUserTours = () => {
    const access_token = localStorage.getItem('access-token');
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };

      axios
        .get(`${baseUrl}/accounts/special-users/tours`, { headers })
        .then(res => console.log('res :', res))
        .catch(err => console.log('error', err));
    }
  };

  return (
    // <Layout title="لیست تورها">
    //   {loading && <Loader />}
    //   {!loading && (
    //     <div className="tours-list">
    //       <h1 className="tours-list__title">لیست تورها</h1>
    //       {auth.isSpecial && (
    //         <Button onClick={() => navigate('/tours/new')} className="tours-list__add-tour">
    //           افزودن تور جدید
    //         </Button>
    //       )}
    //       <div className="tours-list__tours">
    //         {data.map((tour, index) => (
    //           <TourCard key={index} tour={tour} />
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </Layout>
    <ThemeProvider theme={yellowTheme}>
      <Navbar />
      <IconContext.Provider value={{ color: '#feb714', size: '1.3em' }}>
        {loading && <Loader />}
        {!loading && (
          <div className="search-tours">
            <div className="search-tours__tours-list">
              {isMobileFilters && (
                <div className="search-tours__tours-list__show-filters">
                  <Button
                    className="search-tours__tours-list__show-filters__button"
                    variant="text"
                    onClick={() => {
                      if (showFilters) setShowFilters(false);
                      else setShowFilters(true);
                    }}
                  >
                    <p className="search-tours__tours-list__show-filters__button__text">فیلترها</p>
                    <BsFilterRight />
                  </Button>
                </div>
              )}
              {showFilters && <TourFilters setTourData={setData} />}
              <div className="search-tours__tours-list__tours">
                {data.length > 0 ? (
                  data.map((tour, index) => <TourCard key={index} tour={tour} />)
                ) : (
                  <div className="no-tour-wrapper">
                    <div className="no-tours">
                      <TbZoomCancel style={{ fontSize: '48px', color: '#feb714' }} />
                      <h3 className="no-tours__title">توری یافت نشد.</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Footer />
          </div>
        )}
        {/* </Layout> */}
      </IconContext.Provider>
    </ThemeProvider>
  );
}

export default ToursList;
