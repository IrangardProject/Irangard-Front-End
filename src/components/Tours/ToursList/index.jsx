import React, { useEffect, useState, useRef } from 'react';
import Loader from 'src/components/Loader';
import apiInstance from '../../../config/axios';
import TourCard from '../TourCard';
import './style.scss';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import { TbZoomCancel } from 'react-icons/tb';
import { useMobile, useMobileFilters } from 'src/utils/hooks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconContext } from 'react-icons';
import TourFilters from './TourFilters';
import { BsFilterRight } from 'react-icons/bs';
import Button from 'src/components/Button';
import { useSearchParams, useLocation } from 'react-router-dom';

function ToursList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [next, setNext] = useState(null);
  const isMobile = useMobile();
  const isMobileFilters = useMobileFilters();
  const [showFilters, setShowFilters] = useState(true);
  // const [primaryTourType, setPrimaryTourType] = useState('');

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchParams = new URLSearchParams(location.search);
  const [tourTypeParam, setTourTypeParam] = useState(urlSearchParams.get('tour_type'));
  console.log('the tourTypeParam', tourTypeParam, typeof tourTypeParam);

  const updateResult = async (e, query) => {
    console.log('in update result');
    if (e) e.preventDefault();
    // let query = '';
    // for (const [key, value] of searchParams) {
    //   console.log('filterKeys[key]', filterKeys[key]);
    //   console.log('the key is: ', key);
    //   query += `${filterKeys[key] ?? key}=${value}&`;
    // }
    // // console.log("the search params: ", searchParams);

    // console.log('this is the query: ', query);

    setLoading(true);
    await apiInstance.get(`tours/?${query}`).then(res => {
      console.log('this is the res: ', res.data['results']);
      setData(res.data['results']);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   console.log('in the useEffect');
  //   const searchParams = new URLSearchParams(location.search);
  //   const tourTypeParam = searchParams.get('tour_type');
  //   if (tourTypeParam) {
  //     let d = searchParams;
  //     let query = '';
  //     d.set('tour_type', tourTypeParam);
  //     for (const [key, value] of d) {
  //       console.log('the key is: ', key);
  //       console.log('the value is: ', value);
  //       query += `${key}=${value}&`;
  //     }
  //     setSearchParams(d);
  //     console.log('this is the query: ', query);
  //     updateResult(null, query);
  //   }

  // updateResult();
  // setPrimaryTourType(tourTypeParam);
  // console.log("the tour type received from the url: " + tourTypeParam);
  // }, []);

  useEffect(() => {
    // console.log('in the useEffect, the tourTypeParam: ', tourTypeParam);
    // console.log('the tour type received from the url: ' + tourTypeParam);
    // const searchParams = new URLSearchParams(location.search);
    // const tourTypeParam = searchParams.get('tour_type');
    // setTourTypeParam(searchParams.get('tour_type'));
    // console.log("the tourTypeParam", tourTypeParam);
    // if (tourTypeParam) {
    //   let d = searchParams;
    //   let query = '';
    //   d.set('tour_type', tourTypeParam);
    //   for (const [key, value] of d) {
    //     console.log('the key is: ', key);
    //     console.log('the value is: ', value);
    //     query += `${key}=${value}&`;
    //   }
    //   setSearchParams(d);
    //   console.log('this is the query: ', query);
    //   updateResult(null, query);
    //   // setTourTypeParam(null);
    // } else {
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
    // }
    getSpecialUserTours();
  }, []);

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
              <TourFilters showTourFilters={showFilters} setTourData={setData} primaryTourType={Number(tourTypeParam) + 1} />
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
      </IconContext.Provider>
    </ThemeProvider>
  );
}

export default ToursList;
