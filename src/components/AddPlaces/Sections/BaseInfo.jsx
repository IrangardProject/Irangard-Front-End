import React from 'react';
import { Chip, Radio } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { PlaceTypes } from '../info';
import { BasicInput } from '../Inputs';
export default function BaseInfoSection(props) {
  const { watch, setValue } = useFormContext();

  const placeLabel = PlaceTypes[watch('placeType')]?.label;
  return (
    <div className="baseinfo-section">
      <div className="title">
        <h2>اضافه‌کردن مکان جدید به ایرانگرد</h2>
      </div>

      <div className="description">
        <h5>
          مرسی که تصمیم گرفتی بهمون کمک کنی مکان جدید به ‌ایرانگرد اضافه بشه. برای شروع چطوره یکمی درمورد مکان بهمون بگی
        </h5>
      </div>

      <div className="question" dir="ltr">
        <h3>این مکان چه جور جایی هست؟</h3>
        <div className="options">
          {PlaceTypes.map((PlaceType, index) => (
            <span key={index} className={index == watch('placeType') ? 'active-chip' : ''}>
              <Chip
                onClick={() => setValue('placeType', index)}
                icon={<PlaceType.icon size={20} />}
                label={PlaceType.label}
                variant="outlined"
                className="options__chip"
              />
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3>صاحب مکان هستید؟</h3>
        بله
        <Radio
          checked={watch('isOwner') === 'yes'}
          onChange={e => setValue('isOwner', e.target.value)}
          value="yes"
          name="radio-buttons"
        />
        خیر
        <Radio
          checked={watch('isOwner') === 'no'}
          onChange={e => setValue('isOwner', e.target.value)}
          value="no"
          name="radio-buttons"
        />
      </div>

      {watch('placeType') >= 0 && (
        <>
          <div>
            <h3 className="title">درباره‌ی {placeLabel}</h3>
            <BasicInput
              id="name"
              label={`نام ${placeLabel}`}
              placeholder={`نام ${placeLabel} مورد نظر را وارد کنید`}
              validation={{ required: true, maxLength: 50 }}
            />

            <BasicInput
              id="description"
              label="توضیحات"
              placeholder={`درباره ی ${placeLabel}`}
              validation={{ required: true, maxLength: 500 }}
              isTextArea
            />
          </div>
        </>
      )}
    </div>
  );
}
