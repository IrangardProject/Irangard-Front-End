import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
import Button from 'src/components/Button';
import './styles.scss';
import useAuth from 'src/context/AuthContext';
import apiInstance from 'src/config/axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { tourCategories, eventTypes } from 'src/utils/constants';
import { FormControl, Checkbox, MenuItem, ListItemText, Select } from '@mui/material';
import { RiShipLine } from 'react-icons/ri';
import { BsCalendarEvent } from 'react-icons/bs';

const UserPreferencesModal = ({ open, setOpen, usernameQuery }) => {
  const [eventListOpener, setEventListOpener] = useState(false);
  const [tourListOpener, setTourListOpener] = useState(false);

  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [selectedTourCategories, setSelectedTourCategories] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const auth = useAuth();
  console.log('the user info: ', auth.user);

  useEffect(() => {
    if (auth.user) {
      setSelectedEventTypes(auth.user.favorite_event_types.map(type => eventTypes[Number(type)].label));
      setSelectedTourCategories(auth.user.favorite_tour_types.map(type => tourCategories[Number(type)].label));
    }
  }, [auth.user]);

  const handleEventSelectOpen = () => {
    setEventListOpener(true);
  };

  const handleEventSelectClose = () => {
    setEventListOpener(false);
  };

  const handleTourSelectOpen = () => {
    setTourListOpener(true);
  };

  const handleTourSelectClose = () => {
    setTourListOpener(false);
  };

  const handleEventItemToggle = item => {
    if (selectedEventTypes.includes(item)) {
      setSelectedEventTypes(selectedEventTypes.filter(selectedEventType => selectedEventType !== item));
    } else {
      setSelectedEventTypes([...selectedEventTypes, item]);
    }
  };

  const handleTourItemToggle = item => {
    if (selectedTourCategories.includes(item)) {
      setSelectedTourCategories(selectedTourCategories.filter(selectedTourCategory => selectedTourCategory !== item));
    } else {
      setSelectedTourCategories([...selectedTourCategories, item]);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(selectedEventTypes, selectedTourCategories); // Example: [0, 2, 5]
    const sendingEventTypes = [];
    selectedEventTypes.map(selectedEventType => {
      eventTypes.map(eventType => {
        if (eventType.label === selectedEventType) {
          sendingEventTypes.push(Number(eventTypes.indexOf(eventType)));
        }
      });
    });

    const sendingTourCategories = [];
    selectedTourCategories.map(selectedTourCategory => {
      tourCategories.map(tourCategory => {
        if (tourCategory.label === selectedTourCategory) {
          sendingTourCategories.push(Number(tourCategories.indexOf(tourCategory)));
        }
      });
    });
    const body = {
      favorite_events: sendingEventTypes,
      favorite_tours: sendingTourCategories,
    };
    console.log('the body is: ', body);
    apiInstance
      .post(`/accounts/${auth.user.id}/update_favorite_types/`, body)
      .then(data => {
        console.log('the result of updating the profile: ', data);
        toast.success('اطلاعات با موفقیت تغییر یافت');
        setOpen(false);
      })
      .catch(err => {
        console.log('the error is: ', err);
        toast.error('مشکلی در سامانه رخ داده‌است.');
      });
  };

  const userPreferencesCloseButtonHandler = () => {
    setOpen(false);
  };
  return (
    <Modal className="user-preferences-wrapper" open={open} onClose={userPreferencesCloseButtonHandler}>
      <div className="user-preferences-wrapper__container">
        <div className="user-preferences-wrapper__container__close-btn">
          <button className="user-preferences-close" onClick={() => setOpen(false)}>
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="user-preferences-wrapper__container__header">
          <span className="user-preferences-title">لیست علاقه‌مندی‌های شما</span>
        </div>
        <div className="preference-selections">
          <form onSubmit={handleSubmit} className="preference-form">
            <div className="preference-form__events">
              <div className="preference-form__events__title">
                <BsCalendarEvent size={16} />
                <span className="preference-form__events__title__text">دسته‌بندی رویداد‌ها</span>
              </div>
              <div className="preference-form__events__checkboxes">
                <FormControl sx={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    open={eventListOpener}
                    onOpen={handleEventSelectOpen}
                    onClose={handleEventSelectClose}
                    renderValue={selected => selected.join(', ')}
                    value={selectedEventTypes}
                    onChange={event => setSelectedEventTypes(event.target.value)}
                    sx={{ width: '75%' }}
                  >
                    {eventTypes.map(event => (
                      <MenuItem key={event.value} value={event.label}>
                        <Checkbox
                          checked={selectedEventTypes.includes(event.label)}
                          onChange={() => handleEventItemToggle(event.label)}
                        />
                        <ListItemText primary={event.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="preference-form__tours">
              <div className="preference-form__tours__title">
                <RiShipLine size={16} />
                <span className="preference-form__tours__title__text">دسته‌بندی تور‌ها</span>
              </div>
              <div className="preference-form__tours__checkboxes">
                <FormControl sx={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    open={tourListOpener}
                    onOpen={handleTourSelectOpen}
                    onClose={handleTourSelectClose}
                    renderValue={selected => selected.join(', ')}
                    value={selectedTourCategories}
                    onChange={tour => setSelectedTourCategories(tour.target.value)}
                    sx={{ width: '75%' }}
                  >
                    {tourCategories.map(tour => (
                      <MenuItem key={tour.value} value={tour.label}>
                        <Checkbox
                          checked={selectedTourCategories.includes(tour.label)}
                          onChange={() => handleTourItemToggle(tour.label)}
                        />
                        <ListItemText primary={tour.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button varient="green" className="preference-form__btn" type="submit">
              ثبت تغییرات
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UserPreferencesModal;
