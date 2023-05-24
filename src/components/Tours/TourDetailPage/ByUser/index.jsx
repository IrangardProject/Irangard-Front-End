import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import useAuth from 'src/context/AuthContext';
import { baseUrl } from 'src/utils/constants';

const ByUser = ({ tourLeader }) => {
  const auth = useAuth();
  const user = auth.user;
  if (!user) {
    return null;
  }

  return (
    <div className="by-user">
      {user && (
        <Link to={`/profile/${tourLeader.username}`}>
          <div className="by-user-info">
            {/* <img className="by-user-info__img" src={`${baseUrl}` + user.image} alt={tourLeader.username} /> */}
            <p className="by-user-info__username">ثبت شده توسط {tourLeader.username}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ByUser;
