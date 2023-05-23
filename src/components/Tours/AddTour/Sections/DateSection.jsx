import React, { useState, useRef } from 'react';
import { set, useFormContext } from 'react-hook-form';
import { BasicInput } from '../Inputs';
import { useMediaQuery, Autocomplete } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Input from 'src/components/Input';
import { convertNumberToPersian, isPersianNumber, convertJalaliDateToGeorgian } from 'src/utils/formatters';
import 'react-multi-date-picker/styles/layouts/mobile.css';


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

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  return (
    <div className="date-section">
      <div className="title">
        <h2>تاریخ تور</h2>
      </div>
      <div className="description">
        <h5> تاریخ رفت و برگشت تور را مشخص کنید.</h5>
      </div>
      <div className="date-inputs">
        <div className="start-date-input">
          <Input
            label="تاریخ رفت:"
            autoComplete="off"
            onBlur={() => setStartDateBlured(true)}
            onFocus={() => startDatePickerRef.current.openCalendar()}
            onClick={() => startDatePickerRef.current.openCalendar()}
            placeholder={isStartDateSelected ? 'انتخاب تاریخ رفت' : 'انتخاب تاریخ رفت'}
            type="text"
            id="start-date"
            value={inputStartDate ? convertNumberToPersian(inputStartDate.toString()) : ''}
            error={startDateBlured && !inputStartDate && 'تاریخ رفت نمی‌تواند خالی باشد.'}
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
            label="تاریخ برگشت:"
            autoComplete="off"
            onBlur={() => setEndDateBlured(true)}
            onFocus={() => endDatePickerRef.current.openCalendar()}
            onClick={() => {
              setShowDatePicker(true);
              endDatePickerRef.current.openCalendar();
            }}
            placeholder="انتخاب تاریخ برگشت"
            type="text"
            id="end-date"
            value={inputEndDate ? convertNumberToPersian(inputEndDate.toString()) : ''}
            error={endDateBlured && !inputEndDate && 'تاریخ برگشت نمی‌تواند خالی باشد.'}
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
    </div>
  );
};

export default TimeAndDateSection;
