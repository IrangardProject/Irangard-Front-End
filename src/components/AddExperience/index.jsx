import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Rating, Autocomplete, TextField } from '@mui/material';
import { MdOutlineLocationOn } from 'react-icons/md';
import Layout from 'src/components/Layout';
import Input from 'src/components/Input';
import RichText from 'src/components/RichText';
import Button from 'src/components/Button';
import TextArea from 'src/components/TextArea';
import { convertNumberToPersian } from 'src/utils/formatters';
import useAuth from 'src/context/AuthContext';
import { baseUrl } from 'src/utils/constants';
import './style.scss';
import apiInstance from '../../config/axios';

let cancelToken;

function AddExperience() {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [rateValue, setRateValue] = useState(3);
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState(null);
  const [placeError, setPlaceError] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return (
      <Layout title="نوشتن تجربه جدید">
        <div className="add-experience">
          <p>برای نوشتن تجربه ابتدا باید وارد شوید.</p>
        </div>
      </Layout>
    );
  }

  useEffect(() => {
    apiInstance.get(`${baseUrl}/places/`).then(res => {
      const placesInfo = res.data.results;
      setPlaces(placesInfo.map(placeInfo => ({
        id: placeInfo.id,
        title: placeInfo.title
      })))
    });
  }, []);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleError('عنوان تجربه نمی‌تواند خالی باشد.');
    } else {
      setTitleError('');
    }
  };

  const handlePlaceChange = async (newValue) => {
    setPlace(newValue);
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel();
    }
    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();
  };

  const submitExperience = async e => {
    let error = false;
    if (place === null) {
      setPlaceError('مکان تجربه نمی‌تواند خالی باشد.');
      error = true;
    }
    if (title === '') {
      setTitleError('عنوان تجربه نمی‌تواند خالی باشد.');
      error = true;
    }
    if (error) {
      toast.error('لطفا فیلدهای مشخص‌شده را اصلاح کنید.');
      return;
    }
    const date = new Date().toLocaleString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    const body = new FormData();
    body.append('date_created', date);
    body.append('title', title);
    body.append('place', place.id);
    body.append('summary', summary);
    body.append('rate', rateValue);
    body.append('body', content);
    if (image.image) {
      body.append('image', image.image);
    }
    setLoading(true);
    await apiInstance
      .post(`${baseUrl}/experiences/`, body)
      .then(res => res.data)
      .then(data => {
        console.log(data);
        toast.success('پست با موفقیت ثبت شد.');
        setTimeout(() => {
          navigate(`/experiences/${data.id}`);
        }, 500);
      })
      .catch(err => {
        toast.error('مشکلی در سامانه رخ داده‌است.');
        console.log(err)
      });
    setLoading(false);
  };

  return (
    <Layout title="نوشتن تجربه جدید">
      <div className="add-experience">
        <Toaster />
        <h1 className="add-experience__title">نوشتن تجربه</h1>
        <div className="state-city__field">
          <Autocomplete
            disablePortal
            options={places}
            getOptionLabel={(object) => object.title}
            value={place}
            onChange={(event, newValue) => handlePlaceChange(newValue)}
            renderInput={params => (
              <div ref={params.InputProps.ref} className="green-field">
                <MdOutlineLocationOn className="icon" />

                <Input
                  {...params.inputProps}
                  autoComplete="off"
                  className="field-input"
                  error={placeError}
                  type="text"
                  id="state"
                  placeholder="انتخاب مکان"
                  value={params.inputProps.value}
                />
              </div>
            )}
          />
        </div>
        <Button className="add-experience__choose-img-btn" onClick={() => imageRef.current.click()}>
          <input
            type="file"
            ref={imageRef}
            style={{ display: 'none' }}
            onChange={e => {
              setImage({
                image: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0]),
              });
            }}
            accept="image/*"
          />
          انتخاب عکس شاخص
        </Button>
        {image && <img className="add-experience__img" src={image.preview} />}
        <Input
          label="عنوان:"
          placeholder="عنوان..."
          value={title}
          onChange={handleTitleChange}
          error={titleError}
        />
        <div className="add-experience__rating">
          <label className="add-experience__rating-label">امتیاز: {convertNumberToPersian(rateValue)}</label>
          <div className="add-experience__rating-choose">
            <Rating
              value={rateValue}
              onChange={(event, newValue) => {
                setRateValue(newValue);
              }}
            />
          </div>
        </div>
        <TextArea
          label="خلاصه تجربه:"
          placeholder="متن خلاصه تجربه..."
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <RichText
          label="متن تجربه:"
          onChange={cnt => {
            setContent(cnt);
            console.log(cnt);
          }}
        />
        <Button variant="green" onClick={submitExperience} disabled={loading}>
          ثبت تجربه
        </Button>
      </div>
    </Layout>
  );
}

export default AddExperience;
