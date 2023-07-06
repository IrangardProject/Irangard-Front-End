import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import useAuth from 'src/context/AuthContext';
import { baseUrl } from 'src/utils/constants';

const ByUser = ({ eventProvider }) => {
  const auth = useAuth();
  const user = auth.user;
  console.log('this is the user: ', auth);
  console.log('the eventProvider is: ', eventProvider);
  if (!user) {
    return null;
  }

  return (
    <div className="by-user">
      {user && (
        <Link to={`/profile/${eventProvider.username}`}>
          <div className="by-user-info">
            <img className="by-user-info__img" src={eventProvider.image} alt={eventProvider.username} />
            <p className="by-user-info__username">ثبت شده توسط {eventProvider.username}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ByUser;
