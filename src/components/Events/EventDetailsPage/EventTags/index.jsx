import React from 'react';
import './styles.scss';
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';

const EventTags = ({ tags }) => {
  return (
    <div className="event-available-tags">
      <div className="event-available-tags__title">
        <div className="event-available-tags__title__icon">
          <MoreOutlinedIcon sx={{ fontSize: 24 }} />
        </div>
        <h4> برچسب ها</h4>
      </div>
      <div className="event-available-tags__tags">
        {tags.map(tag => (
          <div key={tag.name} className="event-available-tags__tag">
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTags;
