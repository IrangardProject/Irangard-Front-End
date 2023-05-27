import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useMobile } from 'src/utils/hooks';
import './styles.scss';
import { Link } from 'react-router-dom';
import TourCard from 'src/components/Tours/TourCard';

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

const TourSlider = ({ tours }) => {
  console.log('the tours at the slider: ', tours);
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
    <div className="tour-slider">
      <div className="tour-slider__container">
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider tour-slider__slider">
            {/* <Link to="/tour-experiences/تهران">
              <div className="keen-slider__slide tour-slider__slide">
                <img src={tehran} alt="tehran" />
                <div className="tour-slider__slide-text">تهران</div>
              </div>
            </Link> */}
            {tours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
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

export default TourSlider;
