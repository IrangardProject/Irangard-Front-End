import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import ExperienceCard from './ExperienceCard';
import apiInstance from '../../config/axios';
import { baseUrl } from '../../utils/constants';
import 'keen-slider/keen-slider.min.css';
import './style.scss';

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

  useEffect(() => {
    apiInstance
      .get('/experiences/?ordering=like_number')
      .then(res => res.data)
      .then(data => {
        setLoading(false);
        setTopExperiences(data.results);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home-experiences">
      <h2 className="home-experiences__title">تجربه‌ها و سفرنامه‌های برتر</h2>
      {loading && <div>در حال بارگیری تجربه‌های برتر...</div>}
      {!loading && topExperiences.length > 0 && (
        <div ref={sliderRef} className="keen-slider">
          {topExperiences.map(item => (
            <div key={item.id} className="keen-slider__slide">
              <ExperienceCard
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
