import React, { useState } from 'react';
import './styles.scss';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import TourCategoryCard from './TourCategoryCard';
import { tourCategories } from 'src/utils/constants';
import adventuralTours from 'src/assets/images/adventuralTours.jpg';
import culinaryTours from 'src/assets/images/culinaryTours.jpg';
import culturalTours from 'src/assets/images/culturalTours.jpg';
import entertainmentTours from 'src/assets/images/entertainmentTours.jpg';
import historicalTours from 'src/assets/images/historicalTours.jpg';
import natureTours from 'src/assets/images/natureTours.jpg';
import photographyTours from 'src/assets/images/photographyTours.jpg';
import spiritualTours from 'src/assets/images/spiritualTours.jpg';
import wildlifeTours from 'src/assets/images/wildlifeTours.jpg';
import trainTours from 'src/assets/images/trainTours.jpg';
import desertTours from 'src/assets/images/desertTours.jpg';
import { Link } from 'react-router-dom';

const tourCardData = [
  { tourName: tourCategories[0].label, tourImg: culturalTours },
  { tourName: tourCategories[1].label, tourImg: adventuralTours },
  { tourName: tourCategories[2].label, tourImg: entertainmentTours },
  { tourName: tourCategories[3].label, tourImg: wildlifeTours },
  { tourName: tourCategories[4].label, tourImg: culinaryTours },
  { tourName: tourCategories[5].label, tourImg: spiritualTours },
  { tourName: tourCategories[6].label, tourImg: photographyTours },
  { tourName: tourCategories[7].label, tourImg: historicalTours },
  { tourName: tourCategories[8].label, tourImg: natureTours },
  { tourName: tourCategories[9].label, tourImg: desertTours },
  { tourName: tourCategories[10].label, tourImg: trainTours },
];

const TourCategories = () => {
  const isMobile = window.innerWidth < 480;
  const isTablet = window.innerWidth < 768;
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free',
    slides: { perView: isMobile ? 1.5 : isTablet ? 2.5 : 4.4, spacing: isMobile ? 4 : 8 },
    rtl: true,
  });
  return (
    <div className="tour-categories">
      <div className="tour-categories__title">
        <h2>دنبال چه توری می‌گردی؟</h2>
      </div>

      <div className="tour-categories__cards">
        {/* <TourCategoryCard tourName={tourCategories[0].label} tourImg={adventuralTours} />
        <TourCategoryCard tourName={tourCategories[1].label} tourImg={culinaryTours} />
        <TourCategoryCard tourName={tourCategories[2].label} tourImg={culturalTours} />
        <TourCategoryCard tourName={tourCategories[3].label} tourImg={entertainmentTours} />
        <TourCategoryCard tourName={tourCategories[4].label} tourImg={historicalTours} />
        <TourCategoryCard tourName={tourCategories[5].label} tourImg={natureTours} />
        <TourCategoryCard tourName={tourCategories[6].label} tourImg={photographyTours} />
        <TourCategoryCard tourName={tourCategories[7].label} tourImg={spiritualTours} />
        <TourCategoryCard tourName={tourCategories[8].label} tourImg={wildlifeTours} />
        <TourCategoryCard tourName={tourCategories[9].label} tourImg={trainTours} />
        <TourCategoryCard tourName={tourCategories[10].label} tourImg={desertTours} /> */}
        {/* {tourCardData.map((tourCard, index) => (
          <TourCategoryCard key={index} tourName={tourCard.tourName} tourImg={tourCard.tourImg} />
        ))} */}
        {/* {tourCardData.map((tourCategory, index) => (
            <Link to={`/tours/?tour_type=${index}`} key={index}>
              <TourCategoryCard tourName={tourCategory.tourName} tourImg={tourCategory.tourImg} />
            </Link>
          ))} */}
        {tourCardData.map((tourCategory, index) => (
          <div key={index} className="tour-categories__cards__slide">
            <TourCategoryCard tourName={tourCategory.tourName} tourImg={tourCategory.tourImg} categoryId={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCategories;
