import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BasicInput } from '../Inputs';
import { useMediaQuery, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Button from 'src/components/Button';
import { eventTypes, eventCategories } from 'src/utils/constants';

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
  const eventType = watch('eventType');
  const eventCategory = watch('eventCategory');
  const [inputTag, setInputTag] = useState('');
  const tags = watch('tags');
  // const name = watch('name');
  // const organizer = watch('organizer');

  // useEffect(() => {
  //   console.log('in useEffect of BaseInfoSection');
  //   console.log('tags:', tags);
  //   setValue('tags', watch['tags']);
  // }, [watch('tags')]);

  const handleIsOptionEqualToValue = (option, val) => {
    if (val) {
      if (val.label != option.label) return false;
    }
    return true;
  };

  const handleInputKeyPress = event => {
    if (event.key === 'Enter') {
      console.log('in function handleKeyDown when pressing Enter');
      const newTag = event.target.value.trim();
      if (newTag !== '') {
        // setTags([...tags, newTag]);
        setValue('tags', [...tags, newTag]);
        event.target.value = '';
        setInputTag('');
      }
    }
  };

  const deleteTagHandler = tagToDelete => {
    // setTags(tags.filter(tag => tag !== tagToDelete));
    console.log('in delete tag, the tags: ', tags);
    tags.filter(tag => tag !== tagToDelete);
    console.log('tags after being filtered: ', tags);
    setValue(
      'tags',
      tags.filter(tag => tag !== tagToDelete)
    );
  };

  const tagsHandler = event => {
    console.log('in tags handler', event);
    // setTags([...tags, event.target.value]);
    // setValue('tags', [...tags, event.target.value]);
    setValue('tags', [...tags, inputTag]);
    setInputTag('');
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
          id="name"
          // name="name"
          placeholder="نام رویداد را وارد کنید"
          // validation={{ required: true, maxLength: 50 }}
        />
        <BasicInput
          id="organizer"
          // name="organizer"
          placeholder="نام فرد/سازمان برگزار کننده را وارد کنید"
          // validation={{ required: true, maxLength: 50 }}
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
          onChange={(event, newValue) => {
            setValue('eventTypeIndex', eventTypes.indexOf(newValue));
            setValue('eventType', newValue);
            // setValue('eventType', eventTypes.indexOf(newValue))
          }}
          renderInput={params => {
            return (
              <div ref={params.InputProps.ref}>
                <BasicInput
                  inputProps={{ ...params.inputProps }}
                  id="eventType"
                  name="eventType"
                  placeholder="نوع رویداد را انتخاب کنید."
                  // validation={{ required: true }}
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
          onChange={(event, newValue) => {
            setValue('eventCategoryIndex', eventCategories.indexOf(newValue));
            setValue('eventCategory', newValue);
            // console.log("the eventcategory setting: ", eventCategories.indexOf(newValue))
            // setValue('eventCategory', eventCategories.indexOf(newValue))
          }}
          renderInput={params => {
            return (
              <div ref={params.InputProps.ref}>
                <BasicInput
                  inputProps={{ ...params.inputProps }}
                  id="eventCategory"
                  name="eventCategory"
                  placeholder="دسته بندی رویداد را انتخاب کنید."
                  // validation={{ required: true }}
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
        {/* <form onSubmit={tagsHandler}> */}
        <div className="event-tags-input">
          <div className="tags-input">
            {/* <BasicInput
                id="eventTags"
                placeholder="برچسب های رویداد را وارد کنید"
                validation={{ required: 'برچسب های رویداد را وارد کنید' }}
                // onKeyDown={handleKeyDown}
              /> */}
            <TextField
              // className=''
              inputProps={{ style: { height: '16px', fontSize: '14px', maxWidth: '700px' } }}
              placeholder="برچسب های رویداد را وارد کنید"
              fullWidth
              variant="outlined"
              value={inputTag}
              onChange={event => {
                setInputTag(event.target.value);
              }}
              onKeyPress={handleInputKeyPress}
            />
          </div>
          <div className="tags-input-button">
            <Button
              className="add-tag-button"
              type="button"
              varient="green"
              onClick={event => {
                setInputTag(tagsHandler);
              }}
            >
              افزودن
            </Button>
          </div>
        </div>
        {/* </form> */}
        <div className="event-tags-entered">
          <TagList tags={tags} onDeleteTag={deleteTagHandler} />
        </div>
      </div>
    </div>
  );
};

export default BaseInfoSection;
