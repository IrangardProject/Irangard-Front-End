import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import toast, { Toaster } from 'react-hot-toast';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import RichText from 'src/components/RichText';
import {
  convertNumberToPersian,
  convertNumberToEnglish,
  isPersianNumber,
  convertJalaliDateToGeorgian,
} from 'src/utils/formatters';
import apiInstance from 'src/config/axios';
import './styles.scss';
import 'react-multi-date-picker/styles/layouts/mobile.css';

function EditEventTab({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [isStartDateSelected, setIsStartDateSelected] = useState(false);

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

  useEffect(() => {
    setTitle(data.title);
    setDescription(data.description);
    setImage({ preview: data.image });

    const initialStartDate = convertNumberToEnglish(
      new Date(data.start_date).toLocaleString('fa-IR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })
    );

    const initialEndDate = convertNumberToEnglish(
      new Date(data.end_date).toLocaleString('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric',
      })
    );
    setStartDate(
      new DateObject({
        date: initialStartDate,
        format: 'YYYY/MM/DD',
        calendar: persian,
        locale: persian_fa,
      })
    );
    setEndDate(
      new DateObject({
        date: initialEndDate,
        format: 'YYYY/MM/DD',
        calendar: persian,
        locale: persian_fa,
      })
    );
  }, []);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleError('عنوان رویداد نمی‌تواند خالی باشد.');
    } else {
      setTitleError('');
    }
  };


  const handleSubmit = e => {
    e.preventDefault();
    setStartDateBlured(true);
    setEndDateBlured(true);
    let error = false;
    if (title === '') {
      setTitleError('عنوان رویداد نمی‌تواند خالی باشد.');
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
    body.append('start_date', convertJalaliDateToGeorgian(startDate.toString()) + `T00:00`);
    body.append('end_date', convertJalaliDateToGeorgian(endDate.toString()) + `T00:00`);
    body.append('description', description);
    if (image.image) {
      body.append('image', image.image);
    }

    setLoading(true);

    apiInstance
      .put(`/events/${id}/`, body)
      .then(res => res.data)
      .then(data => {
        toast.success('رویداد با موفقیت ویرایش شد.');
        navigate(`/events/${data.id}`);
      })
      .catch(error => {
        console.log(error);
        toast.error('مشکلی در سامانه رخ داده‌است.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="event-dashboard-edit">
      <Toaster />
      <h1 className="event-dashboard-edit__title">ویرایش رویداد</h1>
      <Input
        label="عنوان:"
        placeholder="عنوان..."
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleChange}
        error={titleError}
      />
      <Button className="event-dashboard-edit__choose-img-btn" onClick={() => imageRef.current.click()}>
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
        انتخاب عکس رویداد
      </Button>
      {image && <img className="event-dashboard-edit__img" src={image.preview} />}
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
        label="توضیحات رویداد:"
        defaultContent={description}
        onChange={content => {
          setDescription(content);
        }}
      />
      <Button variant="black" onClick={handleSubmit} disabled={loading}>
        ویرایش رویداد
      </Button>

      <DatePicker
        ref={startDatePickerRef}
        inputClass="date-input"
        className="rmdp-mobile"
        onChange={date => {
          setStartDate(date);
          setIsStartDateSelected(true);
        }}
        calendar={persian}
        locale={persian_fa}
        minDate={new Date()}
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
        minDate={startDate}
      />
    </div>
  );
}

export default EditEventTab;
