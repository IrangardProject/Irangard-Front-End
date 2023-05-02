import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Checkbox, MenuItem, Select, Switch, Chip, TextField } from '@mui/material';
import apiInstance from '../../../config/axios';
import './styles.scss';
import DatePicker from 'react-multi-date-picker';
import Input from 'src/components/Input';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { convertNumberToPersian, isPersianNumber, convertJalaliDateToGeorgian } from 'src/utils/formatters';
import { eventTypes, eventCategories } from 'src/components/Events/AddEvent/info';
import Button from 'src/components/Button';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdLocationPin, MdOutlineLocationOn, MdSearch } from 'react-icons/md';
import IranStates from 'src/assets/data/IranStates.json';
import IranStateKeys from 'src/assets/data/IranStateKeys.json';

const defaultFilters = {
  is_free: false,
  tags: '',
  type: '',
  category: '',
  province: '',
  city: '',
  startDate: '',
  endDate: '',
};

export const EventFilters = ({ setEventData }) => {
  const filterKeys = {
    q: 'search',
  };
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const [q, setQ] = useState(searchParams.get('title__contains') || '');
  const [eventProvince, setEventProvince] = useState(searchParams.get('province') || '');
  const [eventCity, setEventCity] = useState(searchParams.get('city') || '');
  const [cities, setCities] = useState([]);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDateBlured, setStartDateBlured] = useState(false);
  const [endDateBlured, setEndDateBlured] = useState(false);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const eventTagsRef = useRef(null);

  useEffect(async () => {
    if (eventProvince) console.log('state', IranStateKeys[eventProvince]);
    setCities(await (await fetch(`/assets/data/cities/${eventProvince?.value ?? IranStateKeys[state]}.json`)).json());
  }, [eventProvince]);

  useEffect(() => {
    let d = searchParams;
    console.log(d);
    console.log('the start date is: ', filters.startDate);
    if (filters.is_free) {
      if (filters.is_free === true) {
        d.set('is_free', 1);
      } else {
        d.set('is_free', 0);
      }
    } else d.delete('is_free');
    if (filters.tags) d.set('tag', filters.tags);
    else d.delete('tag');
    if (filters.type) d.set('event_type', filters.type - 1);
    else d.delete('event_type');
    if (filters.category) d.set('event_category', filters.category - 1);
    else d.delete('event_category');
    if (filters.startDate) d.set('start_date__gte', convertJalaliDateToGeorgian(filters.startDate));
    else d.delete('start_date');
    if (filters.endDate) d.set('end_date__lte', convertJalaliDateToGeorgian(filters.endDate));
    else d.delete('end_date');
    if (eventProvince?.label) {
      d.set('province', eventProvince.label);
      if (eventCity?.label) d.set('city', eventCity.label);
      else if (!eventCity) d.delete('city');
    } else if (!eventProvince) {
      d.delete('city');
      d.delete('province');
    }

    for (const [key, value] of d) {
      console.log('the key is: ', key);
      console.log('the value is: ', value);
    }
    setSearchParams(d);
  }, [filters, eventProvince, eventCity]);

  const updateResult = async e => {
    if (filters.is_free === true) {
      console.log('finding all is free');
    }
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
    await apiInstance.get(`events/?${query}`).then(res => {
      console.log('this is the res: ', res.data['results']);
      setEventData(res.data['results']);
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
    searchParams.delete('title__contains');
    searchParams.delete('event_type');
    searchParams.delete('event_category');
    searchParams.delete('is_free');
    searchParams.delete('tag');
    searchParams.delete('province');
    searchParams.delete('city');
    searchParams.delete('start_date__gte');
    searchParams.delete('end_date__lte');
    setSearchParams(searchParams);
    setQ('');
    setEventProvince('');
    setEventCity('');
    updateResult();
  };

  const greenTheme = createTheme({
    palette: {
      primary: {
        main: '#00aa6c',
      },
    },
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  });

  const handleIsOptionEqualToValue = (option, val) => {
    if (val) {
      if (val.label != option.label) return false;
    }
    return true;
  };

  // const removeTagsHandler = (tag) => {
  //   setInputTags(inputTags.filter((t) => t !== tag));
  // };

  // const clearTagsHandler = () => {
  //   setInputTags([]);
  // };

  return (
    <div className="search-events__event-filters">
      <div className="search-events__event-filters__filters">
        <div className="search-events__event-filters__filters-row">
          <div className="search-events__events-filters__filters-row__item">
            <Button className="cancel-filters-btn" variant="text" onClick={cancelFiltersHandle}>
              <AiOutlineDelete style={{ color: 'black', fontSize: '17px', minWidth: '20px' }} />
              <p className="cancel-filters-btn__text">حذف فیلتر ها</p>
            </Button>
          </div>

          <hr className="filter-hr" />

          <div className="search-events__event-filters__header">
            <form className="search-events__filters" onSubmit={updateResult}>
              <div className="search-events__searchbar">
                <div className="green-field">
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
                    placeholder="جست‌و‌جو برای رویداد..."
                  />
                </div>
              </div>
              <div className="province-city">
                <div className="province-city__field">
                  <Autocomplete
                    disablePortal
                    options={IranStates}
                    value={eventProvince}
                    isOptionEqualToValue={handleIsOptionEqualToValue}
                    onChange={(event, newValue) => {
                      console.log('setting the eventProvince to:', newValue);
                      setEventProvince(newValue);
                    }}
                    renderInput={params => (
                      <div ref={params.InputProps.ref} className="green-field">
                        <MdOutlineLocationOn className="icon" />

                        <input
                          {...params.inputProps}
                          autoComplete="off"
                          className="field-input"
                          type="text"
                          id="state"
                          placeholder="استان را انتخاب کنید."
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="province-city__field">
                  <Autocomplete
                    disabled={!eventProvince}
                    value={eventCity}
                    isOptionEqualToValue={handleIsOptionEqualToValue}
                    onChange={(event, newValue) => {
                      setEventCity(newValue);
                    }}
                    options={cities}
                    renderInput={params => (
                      <div ref={params.InputProps.ref} className="green-field">
                        <MdLocationPin className="icon" />

                        <input
                          {...params.inputProps}
                          className="field-input"
                          type="text"
                          id="city"
                          autoComplete="off"
                          placeholder="شهر را انتخاب کنید."
                        />
                      </div>
                    )}
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

          <div className="event-filters__filters-row__item">
            <label className="search-events__search-events__event-filters__filters-row__item__label">رایگان</label>
            <Switch
              checked={filters.is_free}
              onChange={e => setFilters({ ...filters, is_free: e.target.checked })}
              color="primary"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          <div className="search-events__event-filters__filters-row__item type-category">
            <label className="search-events__event-filters__filters-row__item-label">نوع رویداد</label>
            <Select
              className="event-filters__filters-row-item-select"
              value={filters.type}
              // defaultValue={0}
              onChange={e => setFilters({ ...filters, type: e.target.value })}
              placeholder="نوع رویداد"
            >
              {eventTypes.map((type, idx) => (
                <MenuItem value={idx + 1}>{type.label}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="search-events__event-filters__filters-row__item type-category">
            <label className="event-filters__filters-row__item-label">دسته بندی رویداد</label>
            <Select
              className="search-events__event-filters__filters-row__item-select"
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
              placeholder="دسته بندی رویداد"
            >
              {eventCategories.map((category, idx) => (
                <MenuItem value={idx + 1}>{category.label}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="search-events__event-filters__filters-row__item type-category">
            <label className="search-events__event-filters__filters-row__item-label">برچسب‌ها</label>
            <Autocomplete
              className="event-filters__filters-row__item-autocomplete"
              // ref={eventTagsRef}
              // value={inputTags}
              multiple
              onChange={(e, value) => {
                // setInputTags([...inputTags, value]);
                setFilters({ ...filters, tags: value });
              }}
              // onRemove={(event, removedTag) => {
              //   removeTagHandler(removedTag);
              // }}
              // clearOnEscape
              id="tags-filled"
              options={[]}
              defaultValue={[]}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    className="tag-chip"
                    variant="outlined"
                    label={option}
                    // onDelete={() => {
                    //   handleRemoveTag(option);
                    // }}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="برچسب"
                  className="event-filters__filters-row-item-autocomplete-input"
                />
              )}
            />
          </div>
        </div>
        <div className="search-events__event-filters__filters-row date-picker-filter">
          <div className="search-events__event-filters__filters-row__item">
            <Input
              autoComplete="off"
              onBlur={() => setStartDateBlured(true)}
              onFocus={() => startDatePickerRef.current.openCalendar()}
              onClick={() => startDatePickerRef.current.openCalendar()}
              placeholder={isStartDateSelected ? 'انتخاب رویداد از تاریخ ' : 'انتخاب رویداد از تاریخ '}
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
          <div className="search-events__event-filters__filters-row__item">
            <Input
              autoComplete="off"
              onBlur={() => setEndDateBlured(true)}
              onFocus={() => endDatePickerRef.current.openCalendar()}
              onClick={() => {
                setShowDatePicker(true);
                endDatePickerRef.current.openCalendar();
              }}
              placeholder="انتخاب رویداد تا تاریخ"
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
