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

  

  const getPopularEvents = async () =>{
    const {data} =await apiInstance.get(`${baseUrl}/events/recommended_events/`)
    setTopExperiences(data);
    // console.log('data ' , data);
    }
    console.log('popularEvents',topExperiences);
    useEffect(() => {
        
          getPopularEvents();
        
      },[])
  return (
    <div className="home-experiences">
      <h2 className="home-experiences__title">تجربه‌ها و سفرنامه‌های برتر</h2>
      {loading && <div>در حال بارگیری تجربه‌های برتر...</div>}
      {!loading && topExperiences.length > 0 && (
        <div ref={sliderRef} className="keen-slider">
          {topExperiences.map(item => (
            <div key={item.id} className="keen-slider__slide">
              <EventCard
                id={item.id}
                title={item.title}
                description={item.summary}
                userName={item.user_username}
                userImgSrc={`${baseUrl}` + item.user_image}
                imgSrc={item.image}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceSlider;
