import React from 'react';
import './styles.scss';

const EventTags = ({ tags }) => {
  return (
    <div className="event-available-tags">
      <div className="event-available-tags__title">برچسب ها</div>
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
