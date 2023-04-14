import React from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import ImgDragDrop from 'src/components/ImageUploader/index';
import TextArea from 'src/components/TextArea';
// import { Chip, TextField, Autocomplete } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemText from '@mui/material/ListItemText';

const AdditionalInfoSection = () => {
  const { watch, setValue } = useFormContext();
  const isFree = watch('isFree');
  const summary = watch('summary');
  const images = watch('images');
  return (
    <div className="additional-info-section">
      <div className="title">
        <h2>اطلاعات تکمیلی</h2>
      </div>
      <div className="is-free">
        <h3>هزینه ورودی دارد؟</h3>

        <Checkbox checked={watch('isFree')} onChange={e => setValue('isFree', e.target.checked)} />
        <label>خیر، رایگان است.</label>
      </div>
      <div className="event-summary">
        <h3>توضیحات</h3>
        <h5 className="summary-description-label">
          با توضیح کوتاهی درباره رویداد خود توجه مردم را به خود جلب کنید. شرکت کنندگان این را در بالای صفحه رویداد شما
          خواهند دید. (حداکثر 140 کاراکتر)
        </h5>
        <TextArea
          placeholder="خلاصه ای از توضیحات"
          value={summary}
          onChange={e => setValue('summary', e.target.value)}
        />
      </div>
      <div className="upload-images">
        <h3 className="title">تصاویری از رویداد شما</h3>
        <h5 className="img-description-label">
          عکس‌ها را اضافه کنید تا نشان دهید رویداد شما درباره چه چیزی خواهد بود. شما می توانید حداکثر 10 تصویر را آپلود
          کنید.
        </h5>
        <ImgDragDrop />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
