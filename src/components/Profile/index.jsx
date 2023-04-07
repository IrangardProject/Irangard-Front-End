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
import './style.scss';
import defaultProfileImg from '../../assets/images/avatar.png';

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
  const [followLoading, setFollowLoading] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
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
        console.log("the data received: ", data)
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
  }, [usernameQuery]);

  const handleOpen = () => {
    setEditProfileModalOpen(true);
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
              {data.is_owner && (
                <button className="profile-summary__edit" onClick={handleOpen}>
                  <span>ویرایش پروفایل</span>
                  <span>
                    <RiSettings5Line size={20} />
                  </span>
                </button>
              )}
            </div>
            {data.about_me && (
              <div className="profile-summary__about">
                <h3>درباره {data.full_name || 'من'}:</h3>
                <p>{data.about_me}</p>
              </div>
            )}

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
      {!experiencesLoading && <ExperiencesList experiences={experiences} />}
    </Layout>
  );
};

export default Profile;
