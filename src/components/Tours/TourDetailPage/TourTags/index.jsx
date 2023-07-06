import React from 'react';
import './styles.scss';
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';

const TourTags = ({ tags }) => {
  return (
    <div className="tour-available-tags">
      <div className="tour-available-tags__title">
        <div className="tour-available-tags__title__icon">
          <MoreOutlinedIcon sx={{ fontSize: 24 }} />
        </div>
        <h4>برچسب ها</h4>
      </div>
      <div className="tour-available-tags__tags">
        {tags.map(tag => (
          <div key={tag.name} className="tour-available-tags__tag">
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourTags;
