import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from 'src/components/LoginModal/Common';

export const BasicInput = props => {
  const { id, label, validation, placeholder, inputProps, type = 'text', readOnly = false, isTextArea = false } = props;
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
