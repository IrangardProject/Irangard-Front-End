import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { ErrorMessage } from 'src/components/LoginModal/Common';
import DatePicker from 'react-multi-date-picker';
import persian_fa from 'react-date-object/locales/persian_fa';

export function BasicInput(props) {
  const { id, label, validation, placeholder, inputProps, onKeyDown , type = 'text', readOnly = false, isTextArea = false } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const basicInputProps = {
    ...register(id, validation),
    ...inputProps,
    className: `field-input ${errors[id] ? 'invalid' : ''} `,
    autoComplete: 'off',
    id: id,
    name: id,
    placeholder: placeholder,
    type: type,
    readOnly: readOnly,
    onKeyDownListener: onKeyDown,
  };
  console.log('basicInputProps:', basicInputProps);
  return (
    <div className="basic-field">
      {label && (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      )}
      {isTextArea ? <textarea {...basicInputProps}></textarea> : <input {...basicInputProps} />}
      {errors[id] && <ErrorMessage error={errors[id]} />}
    </div>
  );
}

export function WorkTimeInput() {
  const { setValue, watch } = useFormContext();

  const [day, setDay] = useState('Saturday');

  const handleDayChange = (event, newValue) => {
    setDay(newValue);
  };

  const days_label = {
    Saturday: 'شنبه',
    Sunday: 'یکشنبه',
    Monday: 'دوشنبه',
    Tuesday: 'سه شنبه',
    Wednesday: 'چهارشنبه',
    Thursday: 'پنجشنبه',
    Friday: 'جمعه',
  };

  const daysTime = watch('working_hours');

  const handleChange = (day, key, value) => {
    setValue('working_hours', { ...daysTime, [day]: { ...daysTime[day], [key]: value } });
  };

  return (
    <div>
      <TabContext value={day}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleDayChange} variant="scrollable">
            {Object.entries(days_label).map(([day, label]) => (
              <Tab key={day} label={label} value={day} />
            ))}
          </TabList>
        </Box>

        {Object.entries(daysTime).map(([day, time]) => (
          <TabPanel key={day} value={day}>
            <div>
              <Checkbox
                label="شبانه روزی"
                checked={time.all_day}
                onChange={e => handleChange(day, 'all_day', e.target.checked)}
              />
              شبانه روزی
            </div>

            <div className="work-time">
              <div className="work-time__field">
                <div>
                  <label htmlFor="start" className="field__label">
                    ساعت شروع
                  </label>
                  <input
                    disabled={time.all_day}
                    value={time.start_time}
                    onChange={e => handleChange(day, 'start_time', e.target.value)}
                    type="time"
                    className="field-input"
                    id="start"
                    placeholder="ساعت شروع"
                  />
                </div>
              </div>
              <div className="work-time__field">
                <div>
                  <label htmlFor="end" className="field__label">
                    ساعت پایان
                  </label>
                  <input
                    disabled={time.all_day}
                    value={time.end_time}
                    onChange={e => handleChange(day, 'end_time', e.target.value)}
                    type="time"
                    className="field-input"
                    id="end"
                    placeholder="ساعت پایان"
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}

export function HotelRoomsInput(props) {
  const { setValue, watch } = useFormContext();
  const persianNumeral = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const room_keys = ['room_type', 'capacity', 'price'];
  const [errors, setErrors] = useState([false]);
  const [lock, setLock] = useState(false);
  const default_room_values = { room_type: '', capacity: '', price: '' };

  const rooms = watch('rooms');
  const mockRooms = {
    1: '‏۱ نفر',
    2: '‏۲ نفر',
    3: '‏۳ نفر',
    4: '‏۴ نفر',
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rooms];
    list[index][name] = value;
    setValue('rooms', list);
  };

  const handleRemoveClick = index => {
    const list = [...rooms];
    list.splice(index, 1);
    setValue('rooms', list);
  };
  const checkErrors = () => {
    let err = rooms.map(room => !room_keys.every(x => room[x]));
    setErrors(err);
    return err;
  };

  const submitRooms = () => {
    let err = checkErrors();
    if (err.every(x => !x)) setLock(true);
  };
  const handleAddNewRoom = () => {
    let err = checkErrors();
    if (err.every(x => !x)) {
      setValue('rooms', [...rooms, default_room_values]);
    }
  };
  // "room_type": "یک تخته لوکس",
  // "capacity": 1,
  // "price": 200000.0
  return (
    <div className="hotel-rooms">
      <h3>اتاق‌های اقامتگاه</h3>

      {rooms.map((room, i) => {
        const capacityPlaceholder = i === 0 ? 'ظرفیت اتاق' : '؟ نفر';
        return (
          <>
            <div className="hotel-rooms__groupfield">
              <div className="hotel-rooms__field">
                <TextField
                  disabled={lock}
                  name="room_type"
                  id="room-type"
                  placeholder="نوع اتاق را وارد کنید"
                  value={room.room_type}
                  onChange={e => handleInputChange(e, i)}
                  error={errors[i] && !room.room_type}
                />
              </div>
              <div className="hotel-rooms__field">
                <Select
                  disabled={lock}
                  name="capacity"
                  id="room-capacity"
                  displayEmpty
                  value={room.capacity}
                  onChange={e => handleInputChange(e, i)}
                  renderValue={selected => {
                    return selected ? mockRooms[selected] : capacityPlaceholder;
                  }}
                  error={errors[i] && !room.capacity}
                >
                  {Object.entries(mockRooms).map(([val, label], i) => (
                    <MenuItem value={val} key={i}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="hotel-rooms__field">
                <div className={room.price ? 'room-price' : ''}>
                  <NumberFormat
                    disabled={lock}
                    name="price"
                    placeholder="هزینه اتاق را وارد کنید"
                    value={room.price}
                    onChange={e => handleInputChange(e, i)}
                    customInput={TextField}
                    customNumerals={persianNumeral}
                    thousandSeparator
                    error={errors[i] && !room.price}
                  />
                </div>
              </div>
              <div className="btn-box">
                {rooms.length !== 1 && !lock && (
                  <ClearIcon
                    sx={rooms.length - 1 !== i ? { ml: 4 } : {}}
                    className="delete-btn"
                    onClick={() => handleRemoveClick(i)}
                  />
                )}
                {rooms.length - 1 === i && (
                  <>
                    {lock ? (
                      <Button variant="outlined" color="warning" onClick={() => setLock(false)}>
                        ویرایش اتاق‌ها
                      </Button>
                    ) : (
                      <>
                        <AddIcon className="add-btn" onClick={handleAddNewRoom} />
                        <Button variant="outlined" onClick={submitRooms}>
                          ثبت
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {errors[i] && (
              <div className="error-msg" style={{ marginTop: '-5px' }}>
                <p>*ابتدا اطلاعات این اتاق را تکمیل کنید.</p>
              </div>
            )}
          </>
        );
      })}
      {!lock && <div className="guide">*راهنما: قبل زدن ثبت مکان، برای ثبت اطلاعات اتاق‌های اقامتگاه حتما دکمه ثبت را بزنید.</div>}
    </div>
  );
}
