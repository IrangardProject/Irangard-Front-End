import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from 'src/assets/images/avatar.png';
import './styles.scss';

function EventAttendeesTab({ data }) {
  const navigate = useNavigate();
  console.log("the data in attendees: ", data)
  return (
    <div className="event-attendees">
      <h1 className="event-attendees__title">لیست شرکت‌کنندگان</h1>
      {data.length === 0 && <div>هیچ شرکت‌کننده‌ای یافت نشد.</div>}
      <div className="event-attendees__list">
        {data.length > 0 &&
          data.map(attendee => (
            <div
              key={attendee.username}
              onClick={() => navigate(`/profile/${attendee.username}`)}
              className="event-attendees__attendee"
            >
              <img
                className="event-attendees__attendee-img"
                src={attendee.image || defaultProfileImg}
                alt={attendee.username}
              />
              <div className="event-attendees__attendee-name">{attendee.full_name || attendee.username}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventAttendeesTab;
