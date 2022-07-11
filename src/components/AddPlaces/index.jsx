import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import Layout from 'src/components/Layout';
import { EnhancedStepper as Stepper } from 'src/components/Stepper';
import Button from 'src/components/Button';
import { useAddPlace, updatePlace } from 'src/api/places';
import useAuth from 'src/context/AuthContext';
import { BaseInfoSection, MapSection, ContactSection, MoreInfoSection } from './Sections';
import { AddPlaceSteps as steps } from './info';
import './style.scss';

export default function AddPlaces() {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return (
      <Layout title="اضافه کردن مکان جدید">
        <div className="add-place__no-auth">
          <p>برای اضافه کردن مکان ابتدا باید وارد شوید.</p>
        </div>
      </Layout>
    );
  }
  const default_days_time = {
    Saturday: { weekday: '0', all_day: false, start_time: 0, end_time: 0 },
    Sunday: { weekday: '1', all_day: false, start_time: 0, end_time: 0 },
    Monday: { weekday: '2', all_day: false, start_time: 0, end_time: 0 },
    Tuesday: { weekday: '3', all_day: false, start_time: 0, end_time: 0 },
    Wednesday: { weekday: '4', all_day: false, start_time: 0, end_time: 0 },
    Thursday: { weekday: '5', all_day: false, start_time: 0, end_time: 0 },
    Friday: { weekday: '6', all_day: false, start_time: 0, end_time: 0 },
  };
  const default_room_values = { room_type: '', capacity: '', price: '' };
  const methods = useForm({
    defaultValues: {
      activeStep: 0,
      placeType: -1,
      name: '',
      description: '',
      state: '',
      city: '',
      longitude: '',
      latitude: '',
      working_hours: default_days_time,
      rooms: [default_room_values],
      images: [],
    },
  });
  const placeType = methods.watch('placeType');
  const activeStep = methods.watch('activeStep');
  const [preStep, setPreStep] = useState(activeStep);

  useEffect(async () => {
    const stepFields = steps[preStep].fields;
    const isOkay = await methods.trigger(stepFields);
    steps[preStep]['error'] = !isOkay;
    setPreStep(activeStep);
  }, [activeStep]);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      methods.trigger(name);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const { mutateAsync, isLoading } = useAddPlace();

  function filterNullValues(dict) {
    const filtered = Object.keys(dict).reduce(function (filtered, key) {
      if (dict[key]) filtered[key] = dict[key];
      return filtered;
    }, {});
    return filtered;
  }
  const apiAdaptor = placeData => {
    console.log('placeData', placeData);
    const contact = filterNullValues({
      x_location: placeData.latitude,
      y_location: placeData.longitude,
      province: placeData.state.label,
      city: placeData.city.label,
      address: placeData.street,
      phone: placeData.phone,
      email: placeData.email,
      website: placeData.website,
      instagram: placeData.instagram,
    });
    const tags = placeData.tags?.map(x => {
      return { name: x };
    });

    const formatedData = {
      title: placeData.name,
      place_type: placeData.placeType,
      description: placeData.description,
      contact: contact,
      tags: tags,
    };

    return filterNullValues(formatedData);
  };
  const onSubmit = placeData => {
    if (steps.slice(0, 2).some(s => s['error'] === undefined)) toast.error('لطفا ابتدا تمامی مراحل را بگذرونید.');
    else if (steps.some(s => s['error'] === true)) toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
    else
      toast
        .promise(mutateAsync(apiAdaptor(placeData)), {
          loading: 'در حال بررسی...',
          success: res => {
            return 'مکان با موفقیت اضافه شد.';
          },
          error: err => {
            if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
            else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
          },
        })
        .then(res => {
          const form_data = new FormData();
          placeData.images.forEach((img, i) => {
            form_data.append('images', img);
          });
          form_data.append('place_type', placeData.placeType);
          form_data.append('title', placeData.name);
          toast.promise(updatePlace(res.data['id'], form_data), {
            loading: 'در حال آپلود تصاویر...',
            success: res => {
              return 'تصاویر با موفقیت اضافه شد.';
            },
            error: err => {
              if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
              else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
            },
          });
        });
  };
  const onError = (errors, e) => toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
  const AddPlaceSections = [BaseInfoSection, MapSection, ContactSection, MoreInfoSection];
  const AddPlaceSection = AddPlaceSections[preStep];
  return (
    <Layout title="اضافه کردن مکان جدید">
      <div className="add-place">
        <FormProvider {...methods}>
          {placeType >= 0 && (
            <Stepper steps={steps} activeStep={activeStep} setActiveStep={s => methods.setValue('activeStep', s)} />
          )}
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className="add-place__section">
              <AddPlaceSection />
              {placeType >= 0 && (
                <>
                  {activeStep !== 3 ? (
                    <Button variant="green" onClick={() => methods.setValue('activeStep', activeStep + 1)}>
                      ادامه
                    </Button>
                  ) : (
                    preStep !== 2 && (
                      <Button type="submit" variant="green" disabled={isLoading}>
                        ثبت مکان
                      </Button>
                    )
                  )}
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}
