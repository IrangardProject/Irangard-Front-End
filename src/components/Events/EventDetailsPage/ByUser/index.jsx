import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import useAuth from 'src/context/AuthContext';
import { baseUrl } from 'src/utils/constants';

const ByUser = () => {
  const auth = useAuth();
  const user = auth.user;
  console.log('this is the user: ', auth);
  if (!user) {
    return null;
  }

  return (
    <div className="by-user">
      {user && (
        <Link to={`/profile/${user.username}`}>
          <div className="by-user-info">
            <img className="by-user-info__img" src={`${baseUrl}` + user.image} alt={user.username} />
            <p className="by-user-info__username">ثبت شده توسط {user.username}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ByUser;
