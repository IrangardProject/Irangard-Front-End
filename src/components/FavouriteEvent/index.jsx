import React, { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useMobile } from 'src/utils/hooks';
import tehran from 'src/assets/images/tehran.jpg';
import isfahan from 'src/assets/images/isfahan.jpg';
import shiraz from 'src/assets/images/shiraz.jpg';
import ardebil from 'src/assets/images/ardebil.jpg';
import gilan from 'src/assets/images/gilan.jpg';
import qom from 'src/assets/images/qom.jpg';
import yazd from 'src/assets/images/yazd.jpg';
import './index.scss';
import { Link } from 'react-router-dom';

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

const CitySlider = () => {
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
    <div className="city-slider">
      <div className="city-slider__container">
        <h2 className="city-slider__title">تجربه‌های مختلف</h2>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider city-slider__slider">
            <Link to="/city-experiences/تهران">
              <div className="keen-slider__slide city-slider__slide">
                <img src={tehran} alt="tehran" />
                <div className="city-slider__slide-text">تهران</div>
              </div>
            </Link>
            <Link to="/city-experiences/اصفهان">
              <div className="keen-slider__slide city-slider__slide">
                <img src={isfahan} alt="isfahan" />
                <div className="city-slider__slide-text">اصفهان</div>
              </div>
            </Link>
            <Link to="/city-experiences/شیراز">
              <div className="keen-slider__slide city-slider__slide">
                <img src={shiraz} alt="shiraz" />
                <div className="city-slider__slide-text">شیراز</div>
              </div>
            </Link>
            <Link to="/city-experiences/یزد">
              <div className="keen-slider__slide city-slider__slide">
                <img src={yazd} alt="yazd" />
                <div className="city-slider__slide-text">یزد</div>
              </div>
            </Link>
            <Link to="/city-experiences/گیلان">
              <div className="keen-slider__slide city-slider__slide">
                <img src={gilan} alt="gilan" />
                <div className="city-slider__slide-text">گیلان</div>
              </div>
            </Link>
            <Link to="/city-experiences/قم">
              <div className="keen-slider__slide city-slider__slide">
                <img src={qom} alt="qom" />
                <div className="city-slider__slide-text">قم</div>
              </div>
            </Link>
            <Link to="/city-experiences/اردبیل">
              <div className="keen-slider__slide city-slider__slide">
                <img src={ardebil} alt="ardebil" />
                <div className="city-slider__slide-text">اردبیل</div>
              </div>
            </Link>
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

export default CitySlider;
