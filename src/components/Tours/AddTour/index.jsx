import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import toast, { Toaster } from 'react-hot-toast';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Layout from 'src/components/Layout';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import RichText from 'src/components/RichText';
import { convertNumberToPersian, isPersianNumber, convertJalaliDateToGeorgian } from 'src/utils/formatters';
import apiInstance from 'src/config/axios';
import { baseUrl } from 'src/utils/constants';
import './style.scss';
import 'react-multi-date-picker/styles/layouts/mobile.css';

function AddTour() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [cost, setCost] = useState('');
  const [costError, setCostError] = useState('');

  const [capacity, setCapacity] = useState('');
  const [capacityError, setCapacityError] = useState('');

  const [image, setImage] = useState('');
  const imageRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);

  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleError('عنوان تور نمی‌تواند خالی باشد.');
    } else {
      setTitleError('');
    }
  };

  const handleCostChange = e => {
    setCost(e.target.value);
    if (e.target.value === '') {
      setCostError('هزینه تور نمی‌تواند خالی باشد.');
    } else if (!isPersianNumber(convertNumberToPersian(e.target.value))) {
      setCostError('هزینه تور باید عدد باشد.');
    } else {
      setCostError('');
    }
  };

  const handleCapacityChange = e => {
    setCapacity(e.target.value);
    if (e.target.value === '') {
      setCapacityError('ظرفیت تور نمی‌تواند خالی باشد.');
    } else if (!isPersianNumber(convertNumberToPersian(e.target.value))) {
      setCapacityError('ظرفیت تور باید عدد باشد.');
    } else {
      setCapacityError('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStartDateBlured(true);
    setEndDateBlured(true);
    let error = false;
    if (title === '') {
      setTitleError('عنوان تور نمی‌تواند خالی باشد.');
      error = true;
    }
    if (cost === '') {
      setCostError('هزینه تور نمی‌تواند خالی باشد.');
      error = true;
    } else if (!isPersianNumber(convertNumberToPersian(cost))) {
      setCostError('هزینه تور باید عدد باشد.');
      error = true;
    }
    if (capacity === '') {
      setCapacityError('ظرفیت تور نمی‌تواند خالی باشد.');
      error = true;
    } else if (!isPersianNumber(convertNumberToPersian(capacity))) {
      setCapacityError('ظرفیت تور باید عدد باشد.');
      error = true;
    }
    if (!startDate || !endDate) {
      error = true;
    }
    if (error) {
      toast.error('لطفا فیلدهای مشخص‌شده را اصلاح کنید.');
      return;
    }
    const body = new FormData();
    body.append('title', title);
    body.append('cost', cost);
    body.append('capacity', capacity);
    body.append('start_date', convertJalaliDateToGeorgian(startDate.toString()) + `T00:00`);
    body.append('end_date', convertJalaliDateToGeorgian(endDate.toString()) + `T00:00`);
    body.append('description', description);
    if (image.image) {
      body.append('image', image.image);
    }

    setLoading(true);

    apiInstance
      // .post('/tours/', body)
      .post(`${baseUrl}/tours/`, body, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   'Content-Type': 'multipart/form-data',
        // },
      })
      .then(res => res.data)
      .then(data => {
        toast.success('تور با موفقیت اضافه شد.');
        navigate(`/tours/${data.id}`);
      })
      .catch(error => {
        console.log(error);
        toast.error('مشکلی در سامانه رخ داده‌است.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout title="افزودن تور جدید">
      <div className="add-tour">
        <Toaster />
        <h1 className="add-tour__title">افزودن تور جدید</h1>
        <Input
          label="عنوان:"
          placeholder="عنوان..."
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleChange}
          error={titleError}
        />
        <Button className="add-tour__choose-img-btn" onClick={() => imageRef.current.click()}>
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
          انتخاب عکس تور
        </Button>
        {image && <img className="add-tour__img" src={image.preview} />}
        <Input
          label="هزینه تور:"
          placeholder="هزینه تور..."
          value={convertNumberToPersian(cost)}
          onChange={handleCostChange}
          onBlur={handleCostChange}
          error={costError}
        />
        <Input
          label="ظرفیت تور:"
          placeholder="ظرفیت تور..."
          value={convertNumberToPersian(capacity)}
          onChange={handleCapacityChange}
          onBlur={handleCapacityChange}
          error={capacityError}
        />
        <Input
          label="تاریخ شروع:"
          autoComplete="off"
          onBlur={() => setStartDateBlured(true)}
          onFocus={() => startDatePickerRef.current.openCalendar()}
          onClick={() => startDatePickerRef.current.openCalendar()}
          placeholder="انتخاب تاریخ شروع"
          type="text"
          id="start-date"
          value={startDate ? convertNumberToPersian(startDate.toString()) : ''}
          error={startDateBlured && !startDate && 'تاریخ شروع نمی‌تواند خالی باشد.'}
        />
        <Input
          label="تاریخ پایان:"
          autoComplete="off"
          onBlur={() => setEndDateBlured(true)}
          onFocus={() => endDatePickerRef.current.openCalendar()}
          onClick={() => endDatePickerRef.current.openCalendar()}
          placeholder="انتخاب تاریخ پایان"
          type="text"
          id="end-date"
          value={endDate ? convertNumberToPersian(endDate.toString()) : ''}
          error={endDateBlured && !endDate && 'تاریخ پایان نمی‌تواند خالی باشد.'}
        />
        <RichText
          label="توضیحات تور:"
          onChange={content => {
            setDescription(content);
          }}
        />
        <Button variant="black" onClick={handleSubmit} disabled={loading}>
          ثبت تور
        </Button>

        <DatePicker
          ref={startDatePickerRef}
          inputClass="date-input"
          className="rmdp-mobile"
          onChange={date => {
            setStartDate(date);
          }}
          calendar={persian}
          locale={persian_fa}
        />
        <DatePicker
          ref={endDatePickerRef}
          inputClass="date-input"
          className="rmdp-mobile"
          onChange={date => {
            setEndDate(date);
          }}
          calendar={persian}
          locale={persian_fa}
        />
      </div>
    </Layout>
  );
}

export default AddTour;
