import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useMobile } from 'src/utils/hooks';
import './styles.scss';
import { Link } from 'react-router-dom';
import EventCard from 'src/components/Events/EventCard';

const EventSlider = ({ events }) => {
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
    <div className="event-slider">
      <div className="event-slider__container">
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {events.map(event => (
              <div key={event.id} className="keen-slider__slide">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlider;
