import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const TourCategoryCard = ({ tourName, tourImg, categoryId }) => {
  return (
    <Link
      to={`tours/?tour_type=${categoryId}`}
      // onClick={() => onTourCategoryClick(categoryId)}
      className="tour-category-card"
      data-testid="tour-category-card"
    >
      <img src={tourImg} alt={tourName} className="tour-category-card__img" />
      <h3 className="tour-category-card__title" data-testid="tour-category-name">{tourName.length > 20 ? tourName.slice(0, 20) + '...' : tourName}</h3>
    </Link>
  );
};

export default TourCategoryCard;
