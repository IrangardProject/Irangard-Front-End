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

export const BasicInput = props => {
  const {
    id,
    label,
    validation,
    placeholder,
    inputProps,
    // OnKeyDownListener,
    type = 'text',
    readOnly = false,
    isTextArea = false,
  } = props;
  const {
    register,
    formState: { errors, touched },
  } = useFormContext();
  console.log('errors: ', errors);
  // const hasError = !!errors[id] && !!touched && !!touched[id];
  // Object.keys(errors).forEach(key => {
  //   delete errors[key];
  // });
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
  };
  // console.log('the basicInputProps: ', basicInputProps);
  // console.log('the temp: ', {
  //   ...register(id, validation),
  // });
  // console.log('the validation is: ', validation);
  // console.log('the id is: ', id);
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
};
