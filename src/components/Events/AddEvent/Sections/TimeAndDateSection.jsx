import React, { useState, useRef } from 'react';
import { set, useFormContext } from 'react-hook-form';
import { BasicInput } from '../Inputs';
import { useMediaQuery, Autocomplete } from '@mui/material';
import Chip from '@mui/material/Chip';
import Button from 'src/components/Button';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Input from 'src/components/Input';
import { convertNumberToPersian, isPersianNumber, convertJalaliDateToGeorgian } from 'src/utils/formatters';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import moment from 'jalali-moment';
// import Timekeeper from 'react-timekeeper';

const TimeAndDateSection = () => {
  const { watch, setValue } = useFormContext();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [inputStartDate, setInputStartDate] = useState(null);
  const startDate = watch('startDate');
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [inputEndDate, setInputEndDate] = useState(null);
  const endDate = watch('endDate');
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);

  // const [startTime, setStartTime] = useState(null);
  const startTime = watch('startTime');
  // const [endTime, setEndTime] = useState(null);
  const endTime = watch('endTime');

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const startTimeHandler = event => {
    // setStartTime(event.target.value);
    setValue('startTime', event.target.value);
  };
  const endTimeHandler = event => {
    // setEndTime(event.target.value)
    setValue('endTime', event.target.value);
  };

  return (
    <div className="time-and-date-section">
      <div className="title">
        <h2>زمان و تاریخ</h2>
      </div>
      <div className="description">
        <h5>
          {' '}
          به شرکت کنندگان در رویداد بگویید که رویداد شما چه زمانی شروع می شود و چه زمانی به پایان می رسد تا بتوانند برای
          شرکت در آن برنامه ریزی کنند.
        </h5>
      </div>
      <div className="date-inputs">
        <div className="start-date-input">
          <Input
            label="تاریخ شروع:"
            autoComplete="off"
            onBlur={() => setStartDateBlured(true)}
            onFocus={() => startDatePickerRef.current.openCalendar()}
            onClick={() => startDatePickerRef.current.openCalendar()}
            placeholder={isStartDateSelected ? 'انتخاب تاریخ شروع' : 'انتخاب تاریخ شروع'}
            type="text"
            id="start-date"
            value={inputStartDate ? convertNumberToPersian(inputStartDate.toString()) : ''}
            error={startDateBlured && !inputStartDate && 'تاریخ شروع نمی‌تواند خالی باشد.'}
          />
          <div className="date-picker">
            <DatePicker
              ref={startDatePickerRef}
              inputClass="date-input"
              className="rmdp-mobile"
              onChange={date => {
                setInputStartDate(date);
                setValue('startDate', convertJalaliDateToGeorgian(date.toString()));
                setIsStartDateSelected(true);
              }}
              calendar={persian}
              locale={persian_fa}
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="end-date-input">
          <Input
            label="تاریخ پایان:"
            autoComplete="off"
            onBlur={() => setEndDateBlured(true)}
            onFocus={() => endDatePickerRef.current.openCalendar()}
            onClick={() => {
              setShowDatePicker(true);
              endDatePickerRef.current.openCalendar();
            }}
            placeholder="انتخاب تاریخ پایان"
            type="text"
            id="end-date"
            value={inputEndDate ? convertNumberToPersian(inputEndDate.toString()) : ''}
            error={endDateBlured && !inputEndDate && 'تاریخ پایان نمی‌تواند خالی باشد.'}
          />
          <div className="date-picker">
            <DatePicker
              ref={endDatePickerRef}
              inputClass="date-input"
              className="rmdp-mobile"
              onChange={date => {
                setInputEndDate(date);
                setValue('endDate', convertJalaliDateToGeorgian(date.toString()));
              }}
              calendar={persian}
              locale={persian_fa}
              minDate={inputStartDate}
            />
          </div>
        </div>
      </div>
      <div className="time-inputs">
        <div className="start-time-input">
          <label htmlFor="start" className="field__label">
            ساعت شروع:
          </label>
          <BasicInput
            value={startTime}
            onChange={startTimeHandler}
            type="time"
            className="field-input"
            id="startTime"
            validation={{ required: true }}
            placeholder="ساعت شروع"
          />
        </div>
        <div className="end-time-input">
          <label htmlFor="end" className="field__label">
            ساعت پایان:
          </label>
          <BasicInput
            value={endTime}
            onChange={endTimeHandler}
            type="time"
            className="field-input"
            id="endTime"
            validation={{ required: true }}
            placeholder="ساعت پایان"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeAndDateSection;
