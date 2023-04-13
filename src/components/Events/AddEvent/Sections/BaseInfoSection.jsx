import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BasicInput } from '../Inputs';
import { useMediaQuery, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from 'src/components/Button';

const TagList = ({ tags, onDeleteTag }) => {
  console.log("the tags: ", typeof tags, tags)
  return (
    <div className="user-tags">
      {tags.map(tag => (
        <Chip key={tag} label={tag} onDelete={onDeleteTag(tag)} color="primary" />
      ))}
    </div>
  );
};

const BaseInfoSection = () => {
  const { watch, setValue } = useFormContext();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const eventType = watch('eventType');
  const eventCategory = watch('eventCategory');
  // const [tags, setTags] = useState([]);
  const tags = watch('tags');

  const eventTypes = [
    { label: 'همایش', value: 'conference' },
    { label: 'کارگاه', value: 'workshop' },
    { label: 'جشنواره', value: 'festival' },
    { label: 'مسابقه', value: 'competition' },
    { label: 'کنفرانس', value: 'conference' },
    { label: 'سمینار', value: 'seminar' },
    { label: 'جلسه', value: 'meeting' },
    { label: 'کارگاه', value: 'workshop' },
  ];
  const eventCategories = [
    { label: 'هنری', value: 'art' },
    { label: 'علمی', value: 'science' },
    { label: 'فرهنگی', value: 'culture' },
    { label: 'ورزشی', value: 'sport' },
    { label: 'سیاسی', value: 'politics' },
    { label: 'اجتماعی', value: 'social' },
    { label: 'مذهبی', value: 'religion' },
  ];

  const handleIsOptionEqualToValue = (option, val) => {
    if (val) {
      if (val.label != option.label) return false;
    }
    return true;
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      console.log('in function handleKeyDown when pressing Enter');
      const newTag = event.target.value.trim();
      if (newTag !== '') {
        // setTags([...tags, newTag]);
        setValue('tags', [...tags, newTag]);
        event.target.value = '';
      }
    }
  };

  const handleDelete = tagToDelete => () => {
    // setTags(tags.filter(tag => tag !== tagToDelete));
    setValue('tags', tags.filter(tag => tag !== tagToDelete));
  };

  const tagsHandler = event => {
    console.log('in tags handler', event);
    // setTags([...tags, event.target.value]);
    setValue('tags', [...tags, event.target.value]);
  };

  return (
    <div className="baseinfo-section">
      <div className="title">
        <h2>ثبت رویداد جدید در ایرانگرد</h2>
      </div>
      <div className="description">
        <h5>نام رویداد را وارد کرده و آن را توصیف کنید.</h5>
      </div>
      <div>
        <BasicInput
          id="eventName"
          // label="نام رویداد"
          placeholder="نام رویداد را وارد کنید"
          validation={{ required: true }}
        />
        <BasicInput
          id="eventOrganizer"
          // label="نام فرد/سازمان برگزار کننده"
          placeholder="نام فرد/سازمان برگزار کننده را وارد کنید"
          validation={{ required: true }}
        />
      </div>
      <div className="event-details">
        {/* <label htmlFor="event-type">استان</label> */}
        <Autocomplete
          className="event-type"
          disablePortal
          options={eventTypes}
          value={eventType}
          isOptionEqualToValue={handleIsOptionEqualToValue}
          onChange={(event, newValue) => {}}
          renderInput={params => {
            return (
              <div ref={params.InputProps.ref}>
                <BasicInput
                  inputProps={{ ...params.inputProps }}
                  id="event-type"
                  placeholder="نوع رویداد را انتخاب کنید."
                  validation={{ required: true }}
                />
              </div>
            );
          }}
        />
        <Autocomplete
          className="event-category"
          disablePortal
          options={eventCategories}
          value={eventCategory}
          isOptionEqualToValue={handleIsOptionEqualToValue}
          onChange={(event, newValue) => {}}
          renderInput={params => {
            return (
              <div ref={params.InputProps.ref}>
                <BasicInput
                  inputProps={{ ...params.inputProps }}
                  id="event-category"
                  placeholder="دسته بندی رویداد را انتخاب کنید."
                  validation={{ required: true }}
                />
              </div>
            );
          }}
        />
      </div>
      <div className="event-tags">
        <div className="event-tags-title">
          <h3>برچسب های رویداد</h3>
          <br />
          <h5>با افزودن برچسب های مرتبط با موضوع، قابلیت کشف رویداد خود را بهبود ببخشید.</h5>
        </div>
        <form onSubmit={tagsHandler}>
          <div className="event-tags-input">
            <div className="tags-input">
              <BasicInput
                id="eventTags"
                placeholder="برچسب های رویداد را وارد کنید"
                validation={{ required: 'برچسب های رویداد را وارد کنید' }}
                // onKeyDown={handleKeyDown}
              />
            </div>
            <div className="tags-input-button">
              <Button
                type="submit"
                // varient="green"
                // onClick={tagsHandler}
              >
                اضافه کردن
              </Button>
            </div>
          </div>
        </form>
        <div className="event-tags-entered">
          <TagList tags={tags} onDeleteTag={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default BaseInfoSection;
