import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useMobile } from 'src/utils/hooks';
import './styles.scss';
import { Link } from 'react-router-dom';
import EventCard from 'src/components/Events/EventCard';

const Arrow = props => {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};

const EventSlider = ({ events }) => {
  console.log('the events at the slider: ', events);
  const isMobile = useMobile();
  const slidesPerview = isMobile ? 3 : 6;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { spacing: isMobile ? 10 : 15, perView: isMobile ? 3 : 6 },
    initial: 0,
    rtl: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <div className="event-slider">
      <div className="event-slider__container">
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider event-slider__slider">
            {/* <Link to="/event-experiences/تهران">
              <div className="keen-slider__slide event-slider__slide">
                <img src={tehran} alt="tehran" />
                <div className="event-slider__slide-text">تهران</div>
              </div>
            </Link> */}
            {events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                disabled={currentSlide + slidesPerview > instanceRef.current.track.details.slides.length - 1}
                onClick={e => e.stopPropagation() || instanceRef.current?.next()}
              />
              <Arrow onClick={e => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventSlider;
