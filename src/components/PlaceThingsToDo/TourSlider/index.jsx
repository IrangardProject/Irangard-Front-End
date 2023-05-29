import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useMobile } from 'src/utils/hooks';
import './styles.scss';
import { Link } from 'react-router-dom';
import TourCard from 'src/components/Tours/TourCard';

const TourSlider = ({ tours }) => {
  // const isMobile = useMobile();
  const isMobile = window.innerWidth < 480;
  const isTablet = window.innerWidth < 768;
  console.log('is tablet: ', isTablet);
  console.log('is mobile: ', isMobile);
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: { perView: isMobile ? 1.5 : isTablet ? 2.5 : 4.4, spacing: isMobile ? 4 : 8 },
    rtl: true,
  });

  return (
    <div className="tour-slider">
      <div className="tour-slider__container">
        <div className="tours-navigation-wrapper">
          <div ref={sliderRef} className="available-tours-keen-slider">
            {tours.map(tour => (
              <div key={tour.id} className="available-tours-keen-slider__slide">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourSlider;
