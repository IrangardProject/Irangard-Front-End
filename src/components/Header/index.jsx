import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  RiMarkPenLine,
  RiRestaurantLine,
  RiHome3Line,
  RiChatQuoteLine,
  RiShipLine,
  RiAncientPavilionFill,
} from 'react-icons/ri';
import { BsCalendarEvent, BsList } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
import Navbar from '../Navbar';
import './style.scss';
import PlaceThingsToDoSearch from '../PlaceThingsToDoSearch';
import Button from 'src/components/Button';

const Header = () => {
  const [thingsToDoSearchOpen, setThingsToDoSearchOpen] = useState(false);
  const openThingsToDoSearchHandler = () => {
    setThingsToDoSearchOpen(true);
  };

  return (
    <>
      <div className="header__nav-items-wrapper">
        <Link to="/Search" className="header__nav-item">
          <div className="txt">مکان‌ها</div>
          <MdPlace size={20} />
        </Link>

        {/* <Button className="header__nav-item" onClick={openThingsToDoSearchHandler}>
          <div className="txt">انجام‌دادنی‌ها</div>
          <BsList size={20} />
        </Button> */}
        <div className="header__nav-item" onClick={openThingsToDoSearchHandler}>
          <div className="txt">ایران‌گردی</div>
          <BsList size={20} />
        </div>

        <PlaceThingsToDoSearch open={thingsToDoSearchOpen} setOpen={setThingsToDoSearchOpen} />

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
      </div>
    </>
  );
};

export default Header;
