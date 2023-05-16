import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { RiMarkPenLine } from 'react-icons/ri';
import LoginModal from '../LoginModal';
import ProfileMenu from 'src/components/ProfileMenu';
import useAuth from 'src/context/AuthContext';
import './style.scss';
import { BsCreditCard2Back } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import UserWallet from 'src/components/UserWallet';

const Navbar = ({}) => {
  const [open, setOpen] = useState(false);
  const [userWalletOpen, setUserWalletOpen] = useState(false);
  const auth = useAuth();
  console.log('auth:', auth);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const userWalletOpenHandler = () => {
    setUserWalletOpen(true);
  };
  return (
    <>
      <LoginModal open={open} handleClose={handleClose} />
      <div className="header__navbar" data-tetsid="main-navbar">
        <div className="header__navbar-container">
          <Link to="/" className="header__logo">
            ایران<span className="header__logo--green">گرد</span>
          </Link>
          <div className="header__navbar-left">
            <button className="header__write-btn" onClick={() => navigate('/experiences/new')}>
              نوشتن تجربه
              <RiMarkPenLine size={24} />
            </button>
            {auth.isLoggedIn && (
              <button className="user-wallet" onClick={userWalletOpenHandler}>
                <IoWalletOutline size={24} />
              </button>
            )}

            <UserWallet open={userWalletOpen} setOpen={setUserWalletOpen} />

            {auth.isLoggedIn && (
              <StyledEngineProvider injectFirst>
                <ProfileMenu />
              </StyledEngineProvider>
            )}
            {!auth.isLoggedIn && (
              <button className="header__signin-btn" onClick={() => setOpen(true)}>
                ورود
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
