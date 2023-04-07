import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { RiMapPinLine, RiHeartFill, RiTimeLine } from 'react-icons/ri';
import Layout from '../Layout';
import Comments from '../Comments';
import RichText from '../RichText';
import Loader from '../Loader';
import { convertNumberToPersian, formatDate } from '../../utils/formatters';
import { baseUrl } from 'src/utils/constants';
import defaultXpImg from '../../assets/images/defaultXpImg.png';
import useAuth from '../../context/AuthContext';
import Button from '../Button';
import apiInstance from '../../config/axios';
import './style.scss';
import toast from 'react-hot-toast';

function ExperienceDetail() {
  const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setisLiking] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(async () => {
    await apiInstance
      .get(`${baseUrl}/experiences/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log("experience data: ", data)
        setData(data);
        setIsLiked(data.is_liked_new);
        setLikesNumber(data.like_number);
      })
      .catch(error => {
        console.log(error.response.status);
        if (error.response.status === 404 || error.response.status === 400) {
          navigate('/notFound');
        }
      });
    setLoading(false);
  }, []);

  const handleLike = () => {
    console.log('is like: ', isLiked);
    setisLiking(true);
    apiInstance
      .post(`/experiences/${id}/${isLiked ? 'unlike' : 'like'}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (isLiked) {
          setLikesNumber(old => old - 1);
        } else {
          toast.success('شما این تجربه را پسندیدید')
          setLikesNumber(old => old + 1);
        }
        setIsLiked(old => !old);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setisLiking(false);
      });
  };

  const removeExperience = () => {
    setIsDeleting(true);
    apiInstance
      .delete(`/experiences/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        toast.success('تجربه با موفقیت حذف شد.');
        navigate('/experiences');
      })
      .catch(error => {
        console.log(error);
        toast.error('مشکلی در سامانه رخ داده است.');
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && (
        <div className="experience-detail">
          {(data.is_owner || auth.isAdmin) && (
            <Button className="experience-detail__remove-btn" variant="red" onClick={removeExperience}>
              حذف تجربه
            </Button>
          )}
          <h1 className="experience-detail__title">{data.title}</h1>
          <div className="experience-detail__place-rate">
            <p className="experience-detail__place">
              <RiMapPinLine size={20} />
              {data.place_title}
            </p>
            <div className="experience-detail__rating">
              <Rating dir="ltr" readOnly precision={0.1} defaultValue={data.rate} max={5} />
              <div className="experience-detail__rating-value">{convertNumberToPersian(data.rate)}</div>
            </div>
          </div>
          <div className="experience-detail__likes-date">
            <div className="experience-detail__date">
              <RiTimeLine size={20} />
              {formatDate(data.date_created)}
            </div>
            {/* <div className="experience-detail__likes">
              <RiHeartFill size={20} />
              {convertNumberToPersian(likesNumber)}
            </div> */}
          </div>
          <div className='experience-detail__like-section'>
          {auth.isLoggedIn && (
            <Button
              onClick={handleLike}
              className={`experience-detail__like-btn ${
                isLiked ? 'experience-detail__like-btn--fill' : 'experience-detail__like-btn--empty'
              }`}
              disabled={isLiking}
            >
              {isLiked ? 'پسندیده‌شده' : 'پسندیدن'}
              <ThumbUpIcon fontSize="12px" />
            </Button>
          )}
          <div className="experience-detail__likes">
              <RiHeartFill size={20} />
              {convertNumberToPersian(likesNumber)}
            </div>
          </div>
          <img className="experience-detail__img" src={data.image || defaultXpImg} alt={data.title} />
          {data.summary && (
            <>
              <h2 className="experience-detail__title-2">خلاصه</h2>
              <p className="experience-detail__summary-body">{data.summary}</p>
            </>
          )}
          {data.body && (
            <>
              <h2 className="experience-detail__title-2">متن تجربه</h2>
              <RichText
                readOnly
                editorClassName="experience-detail__body-editor"
                hideToolbar
                defaultContent={data.body}
              />
            </>
          )}
          <Link to={`/profile/${data.user_username}`}>
            <div className="experience-detail__author-info">
              <img className="experience-detail__author-img" src={`${baseUrl}` + data.user_image} alt={data.user_username} />
              <p className="experience-detail__author-name">نوشته شده توسط {data.user_username}</p>
            </div>
          </Link>
          <Comments experienceId={id} />
        </div>
      )}
    </Layout>
  );
}

export default ExperienceDetail;
