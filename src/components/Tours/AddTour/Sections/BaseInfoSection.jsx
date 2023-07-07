import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BasicInput } from '../Inputs';
import { useMediaQuery, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from 'src/components/Button';
import { tourCategories } from 'src/utils/constants';

const TagList = ({ tags, onDeleteTag }) => {
  return (
    <div className="user-tags">
      {tags.map(tag => (
        <Chip className="tag-chips" key={tag} label={tag} onDelete={() => onDeleteTag(tag)} color="primary" />
      ))}
    </div>
  );
};

const BaseInfoSection = () => {
  const { watch, setValue } = useFormContext();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const tourCategory = watch('tourCategory');
  const [inputTag, setInputTag] = useState('');
  const tags = watch('tags');

  const handleIsOptionEqualToValue = (option, val) => {
    if (val) {
      if (val.label != option.label) return false;
    }
    return true;
  };

  const handleInputKeyPress = tour => {
    if (tour.key === 'Enter') {
      const newTag = tour.target.value.trim();
      if (newTag !== '') {
        setValue('tags', [...tags, newTag]);
        tour.target.value = '';
        setInputTag('');
      }
    }
  };

  const deleteTagHandler = tagToDelete => {
    tags.filter(tag => tag !== tagToDelete);
    setValue(
      'tags',
      tags.filter(tag => tag !== tagToDelete)
    );
  };

  const tagsHandler = tour => {
    setValue('tags', [...tags, inputTag]);
    setInputTag('');
  };

  return (
    <div className="baseinfo-section">
      <div className="title">
        <h2>ثبت تور جدید در ایرانگرد</h2>
      </div>
      <div className="description">
        <h5>اطلاعات اولیه مربوط به تور خود را در فیلد های زیر وارد کنید.</h5>
      </div>
      <div>
        <BasicInput
          id="tourName"
          // name="name"
          placeholder="نام تور را وارد کنید"
          // validation={{ required: true, maxLength: 50 }}
        />
      </div>
      <div className="tour-price-and-capacity">
        <div className="tour-price-and-capacity__price">
          <BasicInput
            id="tourPrice"
            placeholder="هزینه تور..."
            // validation={{ required: true }}
          />
        </div>
        <div className="tour-price-and-capacity__capacity">
          <BasicInput
            id="tourCapacity"
            placeholder="ظرفیت تور..."
            // validation={{ required: true }}
          />
        </div>
      </div>
      <div className="tour-details">
        <Autocomplete
          className="tour-category"
          disablePortal
          options={tourCategories}
          value={tourCategory}
          isOptionEqualToValue={handleIsOptionEqualToValue}
          onChange={(tour, newValue) => {
            setValue('tourCategoryIndex', tourCategories.indexOf(newValue));
            setValue('tourCategory', newValue);
          }}
          renderInput={params => {
            return (
              <div ref={params.InputProps.ref}>
                <BasicInput
                  inputProps={{ ...params.inputProps }}
                  id="tourCategory"
                  name="tourCategory"
                  placeholder="دسته بندی تور را انتخاب کنید."
                  // validation={{ required: true }}
                />
              </div>
            );
          }}
        />
      </div>
      <div className="tour-tags">
        <div className="tour-tags-title">
          <h3>برچسب های تور</h3>
          <br />
          <h5>با افزودن برچسب های مرتبط با موضوع، قابلیت کشف تور خود را بهبود ببخشید.</h5>
        </div>
        <div className="tour-tags-input">
          <div className="tags-input">
            {/* <BasicInput
                id="tourTags"
                placeholder="برچسب های رویداد را وارد کنید"
                validation={{ required: 'برچسب های رویداد را وارد کنید' }}
                // onKeyDown={handleKeyDown}
              /> */}
            <TextField
              inputProps={{ style: { height: '16px', fontSize: '14px', maxWidth: '700px' } }}
              placeholder="برچسب های رویداد را وارد کنید"
              fullWidth
              variant="outlined"
              value={inputTag}
              onChange={tour => {
                setInputTag(tour.target.value);
              }}
              onKeyPress={handleInputKeyPress}
            />
          </div>
          <div className="tags-input-button">
            <Button
              className="add-tag-button"
              type="button"
              varient="green"
              onClick={tour => {
                setInputTag(tagsHandler);
              }}
            >
              افزودن
            </Button>
          </div>
        </div>
        <div className="tour-tags-entered">
          <TagList tags={tags} onDeleteTag={deleteTagHandler} />
        </div>
      </div>
    </div>
  );
};

export default BaseInfoSection;
