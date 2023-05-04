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
import { baseUrl } from 'src/utils/constants';
import { useEffect } from 'react';
import axios from 'axios';

const Arrow = props => {
  const disabled = props.disabled || !props.instanceRef ? ' arrow--disabled' : '';
  const onClick = () => {
    if (props.disabled || !props.instanceRef) return;
    props.onClick();
  };
  return (
    <svg
      onClick={onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};


const RecommendedTour = () => {
  const [recommendedTour,setRecommendedTour] = useState([])
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
  // console.log('events',events);

  const getAllRecommen = async() =>{
    const {data} = await axios.get(`${baseUrl}/tours/recommended-tours`)
    setRecommendedTour(data.results)
  }

  useEffect(() => {
    getAllRecommen();
  },[])

  return (
    <div className="city-slider">
      <div className="city-slider__container">
        <h2 className="city-slider__title">تورهای پیشنهادی</h2>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider city-slider__slider">
            {recommendedTour.map((item,index) =>{
              return(
                <Link to={`/tour/${item.id}`} key={index}>
                  <div className="keen-slider__slide city-slider__slide">
                    <img src={item.image} alt={item.title} />
                    <div className="city-slider__slide-text">{item.title}</div>
                  </div>
                </Link>
              )
            })}

          </div>
          {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              disabled={currentSlide + slidesPerview > instanceRef.current?.track?.details?.slides?.length - 1}
              onClick={e => e.stopPropagation() || instanceRef.current?.next()}
              instanceRef={instanceRef.current}
            />
            <Arrow
              disabled={currentSlide === 0}
              onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
              instanceRef={instanceRef.current}
            />
          </>
          )}      

        </div>
      </div>
    </div>
  );
};

export default RecommendedTour;
