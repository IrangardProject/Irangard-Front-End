import React, { useEffect, useState, useRef } from 'react';
import Layout from 'src/components/Layout';
import Loader from 'src/components/Loader';
import Button from 'src/components/Button';
import apiInstance from '../../../config/axios';
import TourCard from '../TourCard';
import useAuth from '../../../context/AuthContext';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import DatePicker from 'react-multi-date-picker';
import Input from 'src/components/Input';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Navbar from 'src/components/Navbar';
import Footer from 'src/components/Footer';
import { convertNumberToPersian, isPersianNumber, convertJalaliDateToGeorgian } from 'src/utils/formatters';
import { TbZoomCancel } from 'react-icons/tb';
import { useMobile } from 'src/utils/hooks';
import { useSearchParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Checkbox, MenuItem, Select, Switch, Chip, TextField } from '@mui/material';
import { MdLocationPin, MdOutlineLocationOn, MdSearch } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { AiOutlineDelete } from 'react-icons/ai';

const defaultFilters = {
  type: '',
  startDate: '',
  endDate: '',
  // tags: '',
  // province: '',
  // city: '',
};

const tourCategories = [
  { label: 'فرهنگی', value: 'cultural' },
  { label: 'ماجراجویی', value: 'adventural' },
  { label: 'تفریحی', value: 'entertainment' },
  { label: 'حیات وحش', value: 'wildlife' },
  { label: 'آشپزی', value: 'culinary' },
  { label: 'معنوی', value: 'spiritual' },
  { label: 'عکاسی', value: 'photography' },
  { label: 'تاریخی', value: 'historical' },
  { label: 'طبیعت گردی', value: 'nature' },
  { label: 'سفرهای آموزشی', value: 'educational' },
  { label: 'سایر', value: 'other' },
];

const TourFilters = ({ setTourData }) => {
  const filterKeys = {
    q: 'search',
  };
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const [q, setQ] = useState(searchParams.get('title__contains') || '');
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  useEffect(() => {
    let d = searchParams;
    console.log(d);
    console.log('the start date is: ', filters.startDate);
    // if (filters.tags) d.set('tag', filters.tags);
    // else d.delete('tag');
    if (q) d.set('title__contains', q);
    else if (q === '') d.delete('title__contains');
    if (filters.type) d.set('tour_type', filters.type - 1);
    else d.delete('tour_type');
    if (filters.startDate) d.set('start_date__gte', convertJalaliDateToGeorgian(filters.startDate));
    else d.delete('start_date');
    if (filters.endDate) d.set('end_date__lte', convertJalaliDateToGeorgian(filters.endDate));
    else d.delete('end_date');

    for (const [key, value] of d) {
      console.log('the key is: ', key);
      console.log('the value is: ', value);
    }
    setSearchParams(d);
  }, [filters]);

  const updateResult = async e => {
    console.log('in update result');
    if (e) e.preventDefault();
    let query = '';
    for (const [key, value] of searchParams) {
      console.log('filterKeys[key]', filterKeys[key]);
      console.log('the key is: ', key);
      query += `${filterKeys[key] ?? key}=${value}&`;
    }

    console.log('this is the query: ', query);

    setLoading(true);
    await apiInstance.get(`tours/?${query}`).then(res => {
      console.log('this is the res: ', res.data['results']);
      setTourData(res.data['results']);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log('updating the info');
    console.log('the filters are: ', filters);
    updateResult();
  }, [filters]);

  const cancelFiltersHandle = () => {
    setFilters(defaultFilters);
    searchParams.delete('tour_type');
    searchParams.delete('start_date__gte');
    searchParams.delete('end_date__lte');
    searchParams.delete('title__contains');
    setSearchParams(searchParams);
    // setSearchedTitle('');
    setQ('')
    updateResult();
  };

  return (
    <div className="search-tours__tour-filters">
      <div className="search-tours__tour-filters__filters">
        <div className="search-tours__tour-filters__filters-row">
          <div className="search-tours__tour-filters__filters-row__item">
            <Button className="cancel-filters-btn" variant="text" onClick={cancelFiltersHandle}>
              <AiOutlineDelete style={{ color: 'black', fontSize: '17px', minWidth: '20px' }} />
              <p className="cancel-filters-btn__text">حذف فیلتر ها</p>
            </Button>
          </div>

          <hr className="filter-hr" />

          <div className="search-tours__tour-filters__header">
            <form className="search-tours__filters" onSubmit={updateResult}>
              <div className="search-tours__searchbar">
                <div className="yellow-field">
                  <MdSearch className="icon" />
                  <input
                    autoComplete="off"
                    className="field-input"
                    type="text"
                    id="mainSearch"
                    value={q}
                    onChange={e => {
                      let v = e.target.value;
                      setQ(v);
                      let d = searchParams;
                      d.set('title__contains', v);
                      setSearchParams(d);
                    }}
                    placeholder="جست‌و‌جو برای تور..."
                  />
                </div>
              </div>

              <div className="search-submit">
                <button type="submit" className="search-submit__search-btn">
                  <p>بگرد</p>
                </button>
              </div>
            </form>
          </div>

          <hr className="filter-hr" />

          <div className="search-tours__tour-filters__filters-row__item type-category">
            <label className="search-tours__tour-filters__filters-row__item-label">دسته بندی تور</label>
            <Select
              className="tour-filters__filters-row-item-select"
              value={filters.type}
              onChange={e => setFilters({ ...filters, type: e.target.value })}
              placeholder="دسته بندی تور"
            >
              {tourCategories.map((category, idx) => (
                <MenuItem value={idx + 1}>{category.label}</MenuItem>
              ))}
            </Select>
          </div>
          {/* <div className="search-tours__tour-filters__filters-row__item type-category">
              <label className="search-tours__tour-filters__filters-row__item-label">برچسب‌ها</label>
              <Autocomplete
                className="tour-filters__filters-row-item-autocomplete"
                multiple
                onChange={(e, value) => setFilters({ ...filters, tags: value })}
                id="tags-filled"
                options={[]}
                defaultValue={[]}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="برچسب"
                    className="tour-filters__filters-row-item-autocomplete-input"
                  />
                )}
              />
            </div> */}
        </div>
        <div className="search-tours__tour-filters__filters-row date-picker-filter">
          <div className="search-tours__tour-filters__filters-row__item">
            <Input
              autoComplete="off"
              onBlur={() => setStartDateBlured(true)}
              onFocus={() => startDatePickerRef.current.openCalendar()}
              onClick={() => startDatePickerRef.current.openCalendar()}
              placeholder={isStartDateSelected ? 'انتخاب تاریخ شروع' : 'انتخاب تاریخ شروع'}
              type="text"
              id="start-date"
              value={filters.startDate ? convertNumberToPersian(filters.startDate.toString()) : ''}
            />
            <div className="date-picker">
              <DatePicker
                ref={startDatePickerRef}
                inputClass="date-input"
                className="rmdp-mobile"
                onChange={date => {
                  setFilters({ ...filters, startDate: date });
                  setIsStartDateSelected(true);
                }}
                calendar={persian}
                locale={persian_fa}
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="search-tours__tour-filters__filters-row__item">
            <Input
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
              value={filters.endDate ? convertNumberToPersian(filters.endDate.toString()) : ''}
            />
            <div className="date-picker">
              <DatePicker
                ref={endDatePickerRef}
                inputClass="date-input"
                className="rmdp-mobile"
                onChange={date => {
                  setFilters({ ...filters, endDate: date });
                }}
                calendar={persian}
                locale={persian_fa}
                minDate={filters.startDate ? filters.startDate : new Date()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourFilters;