import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { RiSettings5Line } from 'react-icons/ri';
import toast, { Toaster } from 'react-hot-toast';
import ExperiencesList from '../ExperiencesList';
import Layout from '../Layout';
import Button from '../Button';
import Followers from '../Followers';
import { convertNumberToPersian } from '../../utils/formatters';
import { baseUrl } from 'src/utils/constants';
import apiInstance from '../../config/axios';
import useAuth from '../../context/AuthContext';
import EditProfileModal from '../EditProfileModal';
import UserPreferencesModal from '../UserPreferencesModal';
import './style.scss';
import defaultProfileImg from '../../assets/images/avatar.png';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TbZoomCancel } from 'react-icons/tb';
import { GrFavorite } from 'react-icons/gr';
import TourCard from 'src/components/Tours/TourCard';
import EventCard from 'src/components/Events/EventCard';

const StyledTabs = styled(props => (
  <Tabs
    sx={{ display: 'flex', justifyContent: 'center' }}
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
    marginTop: '20px',
    // marginBottom: '20px',
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    // alignItems: 'center',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    // backgroundColor: '#635ee7',
    backgroundColor: '#000',
  },
});

const StyledTab = styled(props => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  // color: 'rgba(255, 255, 255, 0.7)',
  color: '#000',
  '&.Mui-selected': {
    // color: '#fff',
    color: '#000',
  },
  '&.Mui-focusVisible': {
    // backgroundColor: 'rgba(100, 95, 228, 0.32)',
    // backgroundColor: '#fff',
    backgroundColor: '#000',
  },
}));

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{}}>
          <Typography sx={{ paddingTop: '20px', paddingLeft: '30px', paddingRight: '30px' }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const { username: usernameQuery } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [followersModalOpen, setFollowersModalOpen] = useState(false);
  const [followingsModalOpen, setFollowingsModalOpen] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [following, setFollowing] = useState(false);

  const [experiences, setExperiences] = useState([]);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [toursLoading, setToursLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const [followLoading, setFollowLoading] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [userPreferencesModalOpen, setUserPreferencesModalOpen] = useState(false);
  const auth = useAuth();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    apiInstance
      .get(`${baseUrl}/accounts/profile/${usernameQuery}`)
      .then(res => res.data)
      .then(data => {
        console.log('the data received: ', data);
        setData(data);
        // setData({
        //   ...data,
        //   profileImg: `${baseUrl}` + data.image,
        // })
        setFollowing(data.following);
        setFollowerCount(data.follower_number);
        setFollowLoading(data.following_number);
      })
      .catch(err => {
        if (err.response?.status === 400) {
          navigate('/notFound');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [usernameQuery]);

  useEffect(async () => {
    console.log('running the useEffect, the usernameQuery is: ', usernameQuery);
    setExperiencesLoading(true);
    await axios
      .get(`${baseUrl}/experiences/?user__username=${usernameQuery}&size=50`)
      .then(res => res.data)
      .then(data => {
        setExperiences(data.results);
      })
      .catch(error => {
        console.log(error);
      });
    setExperiencesLoading(false);
    console.log('the auth in useEffect is: ', auth);
    if (auth.isSpecial) {
      setToursLoading(true);
      console.log('looking for special user tours');
      await axios
        .get(`${baseUrl}/tours/?owner__user__username=${usernameQuery}&size=50`)
        .then(res => res.data)
        .then(data => {
          console.log('the tours fetched: ', data.results);
          setTours(data.results);
        })
        .catch(error => {
          console.log(error);
        });
      setToursLoading(false);
    }

    if (auth.isSpecial) {
      setEventsLoading(true);
      await axios
        .get(`${baseUrl}/events/?added_by__username=${usernameQuery}&size=50`)
        .then(res => res.data)
        .then(data => {
          console.log('the events fetched: ', data.results);
          setEvents(data.results);
        })
        .catch(error => {
          console.log(error);
        });
      setEventsLoading(false);
    }
  }, [usernameQuery]);

  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };

  const openUserPreferencesHandler = () => {
    setUserPreferencesModalOpen(true);
  };

  const closeUserPreferencesHandler = () => {
    setUserPreferencesModalOpen(false);
  };

  const showFollow = data.following !== null && usernameQuery !== auth?.user?.username;

  const handleFollowersModal = () => {
    apiInstance
      .get(`/accounts/${data.id}/followers`)
      .then(res => res.data)
      .then(data => {
        setFollowers(data);
      });
    setFollowersModalOpen(true);
  };

  const handleFollowingsModal = () => {
    apiInstance
      .get(`/accounts/${data.id}/following`)
      .then(res => res.data)
      .then(data => {
        setFollowings(data);
      });
    setFollowingsModalOpen(true);
  };

  const handleFollow = () => {
    setFollowLoading(true);
    if (following) {
      apiInstance
        .post(`/accounts/${data.id}/unfollow/`)
        .then(res => res.data)
        .then(data => {
          console.log(data);
          setFollowing(old => !old);
          setFollowerCount(old => old - 1);
        })
        .finally(() => setFollowLoading(false));
    } else {
      apiInstance
        .post(`/accounts/${data.id}/follow/`)
        .then(res => res.data)
        .then(data => {
          console.log(data);
          setFollowing(old => !old);
          setFollowerCount(old => old + 1);
        })
        .finally(() => setFollowLoading(false));
    }
    apiInstance
      .get(`/accounts/profile/${usernameQuery}`)
      .then(res => res.data)
      .then(data => {
        setData(data);
      });
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title={`پروفایل ${data.username || ''}`}>
      {isLoading && (
        <div className="profile-skeleton">
          <div className="profile-summary-skeleton">
            <div className="profile-summary-skeleton__img-username">
              <div className="profile-summary-skeleton__img skeleton"></div>
              <div className="profile-summary-skeleton__username skeleton"></div>
            </div>
            <div className="profile-summary-skeleton__follow">
              <div className="profile-summary-skeleton__follow-item">
                <div className="profile-summary-skeleton__follow-title skeleton"></div>
                <span className="profile-summary-skeleton__follow-value skeleton"></span>
              </div>
              <div className="profile-summary-skeleton__follow-item">
                <div className="profile-summary-skeleton__follow-title skeleton"></div>
                <span className="profile-summary-skeleton__follow-value skeleton"></span>
              </div>
            </div>
            <div className="profile-summary-skeleton__edit-btn skeleton"></div>
          </div>
          <div className="profile-summary-skeleton__about">
            <div className="profile-summary-skeleton__about-title skeleton"></div>
            <div className="profile-summary-skeleton__about-desc skeleton"></div>
            <div className="profile-summary-skeleton__about-desc skeleton"></div>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <Toaster />
          <div className="profile">
            <div className="profile-summary">
              <div className="profile-summary__img-username">
                <div
                  className={`profile-summary__img ${
                    auth.isSpecial && auth.user.username === data.username ? 'profile-summary__img--special' : ''
                  }`}
                >
                  <img src={data.profileImg || data.image || defaultProfileImg} alt={data.username} />
                </div>
                <p className="profile-summary__username">{data.username}</p>
              </div>
              {showFollow && (
                <Button
                  onClick={() => handleFollow()}
                  className="profile-summary__follow-btn"
                  variant={following ? 'white' : 'blue'}
                >
                  {following ? 'دنبال‌شده' : 'دنبال‌کردن'}
                </Button>
              )}
              <div className="profile-summary__follow">
                <div className="profile-summary__followers" onClick={() => handleFollowersModal()}>
                  دنبال‌کنندگان
                  <span>{convertNumberToPersian(followerCount)}</span>
                </div>
                <div className="profile-summary__followings" onClick={() => handleFollowingsModal()}>
                  دنبال‌شوندگان
                  <span>{convertNumberToPersian(followingCount)}</span>
                </div>
              </div>
              <div classname="profile-summary__options">
                {data.is_owner && (
                  <button className="profile-summary__options__edit" onClick={handleOpen}>
                    <span>ویرایش پروفایل</span>
                    <span>
                      <RiSettings5Line size={20} />
                    </span>
                  </button>
                )}
                {data.is_owner && (
                  <button className="profile-summary__options__user-preferences" onClick={openUserPreferencesHandler}>
                    <span>علاقه‌مندی‌ها</span>
                    <span>
                      <GrFavorite size={20} />
                    </span>
                  </button>
                )}
              </div>
            </div>
            {data.about_me && (
              <div className="profile-summary__about">
                <h3>درباره {data.full_name || 'من'}:</h3>
                <p>{data.about_me}</p>
              </div>
            )}

            <UserPreferencesModal
              open={userPreferencesModalOpen}
              setOpen={setUserPreferencesModalOpen}
              onClose={closeUserPreferencesHandler}
              usernameQuery={usernameQuery}
            />

            <EditProfileModal
              open={editProfileModalOpen}
              setOpen={setEditProfileModalOpen}
              usernameQuery={usernameQuery}
              initialData={data}
              formData={data}
              setFormData={setData}
            />

            <Followers
              label="لیست دنبال‌کنندگان"
              open={followersModalOpen}
              onClose={() => setFollowersModalOpen(false)}
              people={followers}
            />
            <Followers
              label="لیست دنبال‌شوندگان"
              open={followingsModalOpen}
              onClose={() => setFollowingsModalOpen(false)}
              people={followings}
            />
          </div>
        </>
      )}
      {/* {!experiencesLoading && <ExperiencesList experiences={experiences} />} */}
      {/* <div className="profile-tabs">
        <div className="profile-tabs__tabs">
          <div
            className={`profile-tabs__tab ${tabIndex === 0 ? 'profile-tabs__tab--active' : ''}`}
            onClick={() => handleTabClick(0)}
          >
            تجربیات
          </div>
          <div
            className={`profile-tabs__tab ${tabIndex === 1 ? 'profile-tabs__tab--active' : ''}`}
            onClick={() => handleTabClick(1)}
          >
            پست‌ها
          </div>
        </div>
        <div className="profile-tabs__content">
          {tabIndex === 0 && <ExperiencesList experiences={experiences} />}
          {tabIndex === 1 && <PostsList posts={posts} />}
        </div>
      </div> */}
      <Box sx={{ bgcolor: '#fff', borderRadius: '8px', paddingBottom: '30px' }}>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="تجربه ها" />
          {auth.isSpecial && <StyledTab label="تور‌‌ها" />}
          {console.log('user.username and data.username, usernameQuery', data.username, usernameQuery)}
          {/* {auth.isSpecial && auth.user.username === data.username && <StyledTab label="تور‌‌ها" />} */}
          {auth.isSpecial && <StyledTab label="رویداد‌ها" />}
          {/* {auth.isSpecial && auth.user.username === data.username && <StyledTab label="رویداد‌ها" />} */}
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <ExperiencesList experiences={experiences} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="tours">
            {tours.length > 0 ? (
              tours.map((tour, index) => <TourCard key={index} tour={tour} />)
            ) : (
              <div className="no-tour-wrapper">
                <div className="no-tours">
                  <TbZoomCancel style={{ fontSize: '48px', color: '#feb714' }} />
                  <h3 className="no-tours__title">توری یافت نشد.</h3>
                </div>
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {events.length > 0 ? (
            events.map((event, index) => <EventCard key={index} event={event} />)
          ) : (
            <div className="no-event-wrapper">
              <div className="no-events">
                <TbZoomCancel style={{ fontSize: '48px', color: 'rgb(0, 170, 108)' }} />
                <h3 className="no-events__title">رویدادی یافت نشد.</h3>
              </div>
            </div>
          )}
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default Profile;
