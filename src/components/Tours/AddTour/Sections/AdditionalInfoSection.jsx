import React from 'react';
import { useFormContext } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import ImgDragDrop from 'src/components/ImageUploader/index';
import TextArea from 'src/components/TextArea';
import { BasicInput } from '../Inputs';

const AdditionalInfoSection = () => {
  const { watch, setValue } = useFormContext();
  const summary = watch('summary');
  const images = watch('images');

  const phone_validation = {
    pattern: {
      value: /[0-9]{2,14}$/i,
      message: 'شماره تلفن نامعتبر است.',
    },
  };
  const email_validation = {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'ایمیل نامعتبر است.',
    },
  };

  return (
    <div className="additional-info-section">
      <div className="title">
        <h2>اطلاعات تکمیلی</h2>
      </div>
      <div className="contact-section">
        <h1 className="title">اطلاعات تماس</h1>

        <BasicInput
          id="phone"
          type="tel"
          placeholder="شماره تلفن لیدر تور..."
          validation={{ required: true, phone_validation }}
        />
      </div>
      <div className="event-summary">
        <h3>توضیحات</h3>
        <h5 className="summary-description-label">
          با توضیح کوتاهی درباره تور خود توجه مردم را به خود جلب کنید. شرکت کنندگان این را در پایین صفحه تور شما خواهند
          دید. (حداکثر 140 کاراکتر)
        </h5>
        <TextArea
          placeholder="خلاصه ای از توضیحات"
          value={summary}
          onChange={e => setValue('summary', e.target.value)}
        />
      </div>
      <div className="upload-images">
        <h3 className="title">تصاویری از تور شما</h3>
        <h5 className="img-description-label">
          عکس‌ها را اضافه کنید تا نشان دهید تور شما چه حال و هوایی خواهد داشت. شما می توانید حداکثر 10 تصویر را آپلود
          کنید.
        </h5>
        <ImgDragDrop />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
