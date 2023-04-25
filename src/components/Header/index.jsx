import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiMarkPenLine,
  RiRestaurantLine,
  RiHome3Line,
  RiChatQuoteLine,
  RiShipLine,
  RiAncientPavilionFill,
} from 'react-icons/ri';
import { BsCalendarEvent } from 'react-icons/bs';
import Navbar from '../Navbar';
import './style.scss';

const Header = () => {
  return (
    <>
      <div className="header__nav-items-wrapper">
        <Link to="/Search?place_type=0" className="header__nav-item">
          <div className="txt">رستوران‌ها</div>
          <RiRestaurantLine size={20} />
        </Link>
        <Link to="/Search?place_type=1" className="header__nav-item">
          <div className="txt">اقامتگاه‌ها</div>
          <RiHome3Line size={20} />
        </Link>

        <Link to="tours" className="header__nav-item">
          <div className="txt">تورها</div>
          <RiShipLine size={20} />
        </Link>
        <Link to="events" className="header__nav-item">
          <div className="txt">رویدادها</div>
          <BsCalendarEvent size={20} />
        </Link>
        <Link to="experiences" className="header__nav-item">
          <div className="txt">تجربه‌ها</div>
          <RiChatQuoteLine size={20} />
        </Link>
        <Link to="/places/new" className="header__nav-item">
          <div className="txt">مکان جدید</div>
          <RiAncientPavilionFill size={20} />
        </Link>
      </div>
    </>
  );
};

export default Header;
