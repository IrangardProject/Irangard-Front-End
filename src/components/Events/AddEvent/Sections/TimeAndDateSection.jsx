import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
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

const TimeAndDateSection = () => {
  const { watch, setValue } = useFormContext();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [startDate, setStartDate] = useState(null);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);

  const [endDate, setEndDate] = useState(null);
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);

  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  return (
    <div className="time-and-date-section">
      <div className="title">زمان و تاریخ</div>
      <div className="description">
        به شرکت کنندگان در رویداد بگویید که رویداد شما چه زمانی شروع می شود و چه زمانی به پایان می رسد تا بتوانند برای
        شرکت در آن برنامه ریزی کنند.
      </div>
      <div className="date-inputs">
        <div className="start-date-input">
          {/* <div className="start-input"> */}
          <Input
            label="تاریخ شروع:"
            autoComplete="off"
            onBlur={() => setStartDateBlured(true)}
            onFocus={() => startDatePickerRef.current.openCalendar()}
            onClick={() => startDatePickerRef.current.openCalendar()}
            placeholder={isStartDateSelected ? 'انتخاب تاریخ شروع' : 'انتخاب تاریخ شروع'}
            type="text"
            id="start-date"
            value={startDate ? convertNumberToPersian(startDate.toString()) : ''}
            error={startDateBlured && !startDate && 'تاریخ شروع نمی‌تواند خالی باشد.'}
          />
          {/* </div> */}
          <div className="date-picker">
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
          </div>
        </div>
        <div className="end-date-input">
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
          <div className="date-picker">
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
        </div>
      </div>
    </div>
  );
};

export default TimeAndDateSection;
