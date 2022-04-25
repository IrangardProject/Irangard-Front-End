import React from 'react';
import { Link } from 'react-router-dom';
import { RiMarkPenLine, RiRestaurantLine, RiHome3Line, RiChatQuoteLine, RiShipLine } from 'react-icons/ri';
import Navbar from '../Navbar';
import './style.scss';

const Header = () => {
  return (
    <>
      <Navbar />
      <div className="header__nav-items-wrapper">
        <Link to="/restaurants" className="header__nav-item">
          <div>رستوران‌ها</div>
          <RiRestaurantLine size={24} />
        </Link>
        <Link to="/residences" className="header__nav-item">
          <div>اقامتگاه‌ها</div>
          <RiHome3Line size={24} />
        </Link>
        <Link to="tours" className="header__nav-item">
          <div>تورها</div>
          <RiShipLine size={24} />
        </Link>
        <Link to="experiences" className="header__nav-item">
          <div>تجربه‌ها</div>
          <RiChatQuoteLine size={24} />
        </Link>
      </div>
    </>
  );
};

export default Header;
