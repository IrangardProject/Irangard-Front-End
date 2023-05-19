import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { RiMarkPenLine } from 'react-icons/ri';
import LoginModal from '../LoginModal';
import ProfileMenu from 'src/components/ProfileMenu';
import useAuth from 'src/context/AuthContext';
import './style.scss';
import { BsCreditCard2Back, BsFillCalendarEventFill } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';
import UserWallet from 'src/components/UserWallet';
import { TbBellRinging2 } from 'react-icons/tb';
import { Dialog } from '@mui/material';
import apiInstance from 'src/config/axios';
import { MdPlace, MdTour } from 'react-icons/md';

const Navbar = ({}) => {
  const [open, setOpen] = useState(false);
  const [userWalletOpen, setUserWalletOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([]);
  const [place, setPlace] = useState([]);
  const [tours, setTours] = useState([]);
  const auth = useAuth();
  console.log('auth:', auth);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const userWalletOpenHandler = () => {
    setUserWalletOpen(true);
  };

  const handelRingClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getEvents = async () => {
    const access_token = localStorage.getItem('access-token');
    console.log('access_token is', access_token);
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };
      await apiInstance
        .get('/suggestion/event/receiver_suggestions/', { headers })
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getPlace = async () => {
    const access_token = localStorage.getItem('access-token');
    console.log('access_token is', access_token);
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };
      await apiInstance
        .get('/suggestion/place/receiver_suggestions/', { headers })
        .then((res) => {
          setPlace(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }; 
  const getTours = async () => {
    const access_token = localStorage.getItem('access-token');
    console.log('access_token is', access_token);
    if (access_token) {
      const headers = {
        Authorization: `JWT ${access_token}`,
      };
      await apiInstance
        .get('/suggestion/tour/receiver_suggestions/', { headers })
        .then((res) => {
          setPlace(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }; 

  useEffect(() => {
    getEvents();
    getPlace();
    getTours();
  }, []);

  return (
    <>
      <LoginModal open={open} handleClose={handleClose} />
      <div className="header__navbar" data-tetsid="main-navbar">
        <div className="header__navbar-container">
          <section className="logo-ring">
            <Link to="/" className="header__logo">
              ایران<span className="header__logo--green">گرد</span>
            </Link>
            {auth.isLoggedIn && (
              <TbBellRinging2 onClick={handelRingClick} className="ringIcom" />
            )}
            <Dialog className="recieve-suggestion" onClose={handleDialogClose} open={openDialog}>
              <section className="recieve-suggestion__container">
                <h2>لیست پیشنهاد شده به شما</h2>
                <section className='list-of-shared'>
                  <article>
                    <MdPlace />
                    <p>مکان های پیشنهاد شده به شما</p>
                  </article>
                  <article>
                    <MdTour />
                    <p>تور های پیشنهاد شده به شما</p>
                  </article>
                  <article>
                    <BsFillCalendarEventFill />
                    <p>رویداد های پیشنهاد شده به شما</p>
                  </article>
                </section>
              </section>
            </Dialog>
          </section>
          <div className="header__navbar-left">
            <button className="compose-experience" onClick={() => navigate('/experiences/new')}>
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
