import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMediaQuery, Autocomplete } from '@mui/material';
import Map from 'src/components/Map';
import { BasicInput } from '../Inputs';
import IranStates from 'src/assets/data/IranStates.json';

const MapSection = () => {
  const { watch, setValue, trigger, resetField } = useFormContext();
  const useMobile = () => useMediaQuery('(max-width: 470px)');
  const state = watch('state');
  const city = watch('city');
  const address = watch('address');
  const [cities, setCities] = useState([]);
  useEffect(async () => {
    if (state) setCities(await (await fetch(`/assets/data/cities/${state?.value}.json`)).json());
  }, [state]);

  const street_validation = {
    maxLength: {
      value: 100,
      message: 'آدرس باید کمتر از ۲۵ کارکتر باشد.',
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
      <h2 className="title">مشخص کردن مکان تور</h2>
      {/* <h5 className="description">به شرکت کنندگان کمک کنید بدانند کجا باید حضور پیدا کنند.</h5> */}
      <div className="location-info">
        <div className="state-city-address">
          <div className="state-city">
            <div className="state-city__field">
              <Autocomplete
                disablePortal
                options={IranStates}
                value={state}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                onChange={(tour, newValue) => {
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
                        name="state"
                        placeholder="انتخاب استان"
                        validation={{ required: true }}
                      />
                    </div>
                  );
                }}
              />
            </div>
            <div className="state-city__field">
              <Autocomplete
                disablePortal
                options={cities}
                value={city}
                isOptionEqualToValue={handleIsOptionEqualToValue}
                onChange={(tour, newValue) => {
                  setValue('city', newValue);
                  resetField('latitude');
                  resetField('longitude');
                }}
                renderInput={params => {
                  return (
                    <div ref={params.InputProps.ref}>
                      <BasicInput
                        inputProps={{ ...params.inputProps }}
                        id="city"
                        name="city"
                        placeholder="انتخاب شهر"
                        validation={{ required: true }}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="address">
            <BasicInput id="address" name="address" placeholder="آدرس را وارد کنید" validation={{ required: true }} />
          </div>
          <h3 className="coordinates__title">محل روی نقشه</h3>
          <div className="coordinates">
            <div className="coordinates__field">
              <BasicInput
                id="latitude"
                name="latitude"
                placeholder="عرض جغرافیایی"
                validation={{ required: true }}
                readOnly
              />
            </div>
            <div className="coordinates__field">
              <BasicInput
                id="longitude"
                name="longitude"
                placeholder="طول جغرافیایی"
                validation={{ required: true }}
                readOnly
              />
            </div>
          </div>
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
};

export default MapSection;
