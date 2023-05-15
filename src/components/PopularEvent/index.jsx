import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
// import ExperienceCard from './ExperienceCard';
import apiInstance from '../../config/axios';
import { baseUrl } from '../../utils/constants';
import 'keen-slider/keen-slider.min.css';
import './styles.scss';
import EventCard from './EventCard';

const ExperienceSlider = () => {
  const isMobile = window.innerWidth < 480;
  const isTablet = window.innerWidth < 768;
  console.log('is tablet: ', isTablet);
  console.log('is mobile: ', isMobile);
  const [loading, setLoading] = useState(true);
  const [topExperiences, setTopExperiences] = useState([]);
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: { perView: isMobile ? 1.5 : isTablet ? 2.5 : 4.4, spacing: isMobile ? 4 : 8 },
    rtl: true,
  });

  // /events/recommended_events/
  useEffect(() => {
    apiInstance.get(`${baseUrl}/events/recommended_events/`)
      .then(res => {
        // console.log('res in recommended events: ', res);
        setTopExperiences(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  } , [])
  console.log('top experiences: ', topExperiences);

  return (
    <div className="home-experiences">
      <h2 className="home-experiences__title">رویداد های پیشنهادی</h2>
      {/* {loading && <div>در حال بارگیری  ...</div>} */}
      { topExperiences.length > 0 && (
        <div ref={sliderRef} className="keen-slider">
          {topExperiences.map(item => (
            <div key={item.id} className="keen-slider__slide">
              <EventCard
                id={item.id}
                title={item.title}
                description={item.description}
                userName={item.organizer}
                // userImgSrc={`${baseUrl}` + item.user_image}
                imgSrc={item.images[0]}
                city={item.city}
                organizer={item.organizer}
                start_time = {item.start_time}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceSlider;
