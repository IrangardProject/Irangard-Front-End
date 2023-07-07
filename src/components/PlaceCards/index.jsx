import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import { TbZoomCancel } from 'react-icons/tb';
import Places from './Data.js';
import Card from './card';
import 'keen-slider/keen-slider.min.css';
import './style.scss';
const PlaceCards = ({ className = 'home-experiences', data = Places }) => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const isTablet = useMediaQuery('(max-width: 768px)');
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: { perView: isMobile ? 1.5 : isTablet ? 2.5 : 4.4, spacing: isMobile ? 10 : 15 },
    rtl: true,
  });
  if (data.length === 0)
    return (
      <div className="no-place-wrapper">
        <div className="no-places">
          <TbZoomCancel style={{ fontSize: '48px' }} />
          مکانی یافت نشد.
        </div>
      </div>
    );

    console.log("the data in place cards:", data)

  return (
    <div className={className}>
      <div ref={sliderRef} className="flex-column">
        {data.map(item => (
          <div key={item.id} className="">
            <Card placeData={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceCards;
