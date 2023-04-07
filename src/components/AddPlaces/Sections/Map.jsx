import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMediaQuery, Autocomplete } from '@mui/material';
import Map from 'src/components/Map';
import { BasicInput } from '../Inputs';
import IranStates from 'src/assets/data/IranStates.json';

export default function MapSection(props) {
  const { watch, setValue, trigger, resetField } = useFormContext();
  const useMobile = () => useMediaQuery('(max-width: 470px)');
  const state = watch('state');
  const city = watch('city');
  const [cities, setCities] = useState([]);
  useEffect(async () => {
    if (state) setCities(await (await fetch(`/assets/data/cities/${state?.value}.json`)).json());
  }, [state]);

  const street_validation = {
    maxLength: {
      value: 100,
      message: 'آدرس خیابان باید کمتر از ۲۵ کارکتر باشد.',
    },
  };

  const handleChangeLocation = e => {
    setValue('latitude', e.lat);
    setValue('longitude', e.lng);
  };

  const handleIsOptionEqualToValue = (option, val) => {
    if (val) {
      if (val.label != option.label) return false;
    }
    return true;
  };
  return (
    <div className="map-section">
      <h1 className="title">نقشه</h1>
      <div className="location-info">
        <div className="state-city-address">
          <div className="state-city">
            <div className="state-city__field">
              <label htmlFor="state">استان</label>
              <Autocomplete
                disablePortal
                options={IranStates}
                value={state}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                onChange={(event, newValue) => {
                  setValue('state', newValue);
                  resetField('city');
                  resetField('latitude');
                  resetField('longitude');
                }}
                renderInput={params => {
                  return (
                    <div ref={params.InputProps.ref}>
                      <BasicInput
                        inputProps={{ ...params.inputProps }}
                        id="state"
                        placeholder="استان را انتخاب کنید."
                        validation={{ required: true }}
                      />
                    </div>
                  );
                }}
              />
            </div>
            <div className="state-city__field">
              <label htmlFor="city">شهر</label>
              <Autocomplete
                disabled={!state}
                value={city}
                onChange={(event, newValue) => {
                  setValue('city', newValue);
                  resetField('latitude');
                  resetField('longitude');
                }}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                options={cities}
                renderInput={params => {
                  return (
                    <div ref={params.InputProps.ref}>
                      <BasicInput
                        inputProps={{ ...params.inputProps }}
                        id="city"
                        placeholder="شهر را انتخاب کنید."
                        validation={{ required: true }}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>

          <BasicInput
            id="street"
            label="آدرس خیابان"
            placeholder="آدرس خیابان و پلاک ساختمان را اینجا وارد کنید."
            validation={street_validation}
          />

          <h3 className="coordinates__title">مختصات مکان</h3>
          <div className="coordinates">
            <div className="coordinates__field">
              <BasicInput id="latitude" label="عرض" placeholder="عرض مکان" validation={{ required: true }} readOnly />
            </div>
            <div className="coordinates__field">
              <BasicInput id="longitude" label="طول" placeholder="طول مکان" validation={{ required: true }} readOnly />
            </div>
          </div>
          <div className="guide">*راهنما: مختصات مکان را از روی نقشه انتخاب کنید.</div>
        </div>
        <div className="location-info__map">
          {city ? (
            <Map
              style={useMobile && { width: 350, maxWidth: '100%', height: 350 }}
              onChoose={handleChangeLocation}
              defaultLat={city?.lat}
              defaultLong={city?.long}
            />
          ) : (
            <div className="guide box">برای نمایش نقشه، ابتدا استان و سپس شهر مکان را انتخاب کنید.</div>
          )}
        </div>
      </div>
    </div>
  );
}
