import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@mui/material';
// import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { formatPrice, convertNumberToPersian, convertNumberToEnglish } from 'src/utils/formatters.js';
import './styles.scss';
import useAuth from 'src/context/AuthContext';
import apiInstance from 'src/config/axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { tourCategories, eventTypes } from 'src/utils/constants';
import { FormGroup, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { usePutProfile } from 'src/api/profile';
// import clsx from 'clsx';
// import { makeStyles, useTheme } from '@mui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Select from '@material-ui/core/Select';
// import Chip from '@material-ui/core/Chip';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     maxWidth: 300,
//   },
//   chips: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   chip: {
//     margin: 2,
//   },
//   noLabel: {
//     marginTop: theme.spacing(3),
//   },
// }));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


const UserPreferencesModal = ({ open, setOpen, usernameQuery }) => {
  // console.log('the events: ', eventTypes);
  const [selectedEventTypes, setSelectedEventTypes] = useState([]);
  const [selectedTourCategories, setSelectedTourCategories] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const auth = useAuth();
  console.log('the user info: ', auth.user);

  const handleEventTypesChange = event => {
    const { value, checked } = event.target;
    const index = String(value);

    if (checked) {
      setSelectedEventTypes([...selectedEventTypes, index]);
    } else {
      setSelectedEventTypes(selectedEventTypes.filter(type => type !== index));
    }
  };

  const handleTourCategoriesChange = event => {
    const { value, checked } = event.target;
    const index = String(value);

    if (checked) {
      setSelectedTourCategories([...selectedTourCategories, index]);
    } else {
      setSelectedTourCategories(selectedTourCategories.filter(type => type !== index));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(selectedEventTypes, selectedTourCategories); // Example: [0, 2, 5]
    setUpdateLoading(true);
    usePutProfile(
      usernameQuery,
      // body,
      {
        username: auth.user.username,
        favorite_event_types: selectedEventTypes,
        favorite_tour_types: selectedTourCategories,
      },
      error => {
        toast.error('مشکلی در سامانه رخ داده‌است.');
        setUpdateLoading(false);
      },
      data => {
        console.log(data);
        setUpdateLoading(false);
        toast.success('اطلاعات با موفقیت تغییر یافت');
        setOpen(false);
      }
    );
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
              <div className="preference-form__events__title">دسته‌بندی رویداد‌ها</div>
              <div className="preference-form__events__checkboxes">
                {eventTypes.map(event => (
                  <FormControlLabel
                    sx={{ width: 'auto' }}
                    key={event.value}
                    control={
                      <Checkbox
                        checked={selectedEventTypes.includes(String(eventTypes.indexOf(event)))}
                        onChange={handleEventTypesChange}
                        value={eventTypes.indexOf(event)}
                      />
                    }
                    label={event.label}
                  />
                ))}
                {/* <FormControl className={classes.formControl}>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={selectedEventTypes}
                    onChange={handleEventTypesChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(event => (
                          <Chip key={event} label={event.label} className={classes.chip} />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {selectedEventTypes.map(type => (
                      <MenuItem key={type} value={type} style={getStyles(type, selectedEventTypes, theme)}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </div>
            </div>
            <div className="preference-form__tours">
              <div className="preference-form__tours__title">دسته‌بندی تور‌ها</div>
              <div className="preference-form__tours__checkboxes">
                {tourCategories.map(tour => (
                  <FormControlLabel
                    sx={{ width: 'auto' }}
                    key={tour.value}
                    control={
                      <Checkbox
                        checked={selectedTourCategories.includes(String(tourCategories.indexOf(tour)))}
                        onChange={handleTourCategoriesChange}
                        value={tourCategories.indexOf(tour)}
                      />
                    }
                    label={tour.label}
                  />
                ))}
              </div>
            </div>
            {/* </div> */}
            <Button varient="green" className="preference-form__btn" type="submit">
              ثبت
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UserPreferencesModal;
