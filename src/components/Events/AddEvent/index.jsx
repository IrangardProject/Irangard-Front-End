import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import Layout from 'src/components/Layout';
import { EnhancedStepper as Stepper } from 'src/components/Stepper';
import Button from 'src/components/Button';
import useAuth from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from 'src/utils/constants';
import { AddEventSteps as Steps } from './info';
import { eventTypes, eventCategories } from 'src/utils/constants'
import { BaseInfoSection, MapSection, TimeAndDateSection, AdditionalInfoSection } from './Sections';
import { useAddEvent, updateEvent } from 'src/api/Events';
import './styles.scss';
import defaultEventImg2 from 'src/assets/images/defaultEventImg2.jpg';

const AddEvent = () => {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return (
      <Layout title="اضافه کردن رویداد جدید">
        <div className="add-event__no-auth">
          <p>برای اضافه کردن رویداد ابتدا باید وارد شوید.</p>
        </div>
      </Layout>
    );
  }

  const methods = useForm({
    defaultValues: {
      activeStep: 0,
      name: '',
      organizer: '',
      eventType: '',
      eventTypeIndex: 0,
      eventCategory: '',
      eventCategoryIndex: 0,
      tags: [],
      state: '',
      city: '',
      address: '',
      longitude: '',
      latitude: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      isFree: false,
      summary: '',
      images: [],
      phone: '',
      website: '',
    },
  });

  const activeStep = methods.watch('activeStep');
  const [preStep, setPreStep] = useState(activeStep);
  const onError = (errors, e) => toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useAddEvent();

  useEffect(async () => {
    const stepFields = Steps[preStep].fields;
    const isOkay = await methods.trigger(stepFields);
    console.log('isOkay: ' + isOkay);
    Steps[preStep]['error'] = !isOkay;
    setPreStep(activeStep);
  }, [activeStep]);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      methods.trigger(name);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const apiAdaptor = eventData => {
    console.log('event data in apiAdaptor: ', eventData);
    console.log('finding the index of: ', eventTypes.indexOf(eventData.eventData));
    const formatedData = {
      event_type: eventData.eventTypeIndex,
      event_category: eventData.eventCategoryIndex,
      title: eventData.name,
      organizer: eventData.organizer,
      description: eventData.summary,
      x_location: eventData.latitude,
      y_location: eventData.longitude,
      start_date: eventData.startDate,
      end_date: eventData.endDate,
      start_time: eventData.startTime,
      end_time: eventData.endTime,
      province: eventData.state.label,
      city: eventData.city.label,
      tags: eventData.tags.map(tag => {
        return {
          name: tag,
        };
      }),
      address: eventData.address,
      is_free: eventData.isFree,
      added_by: auth.user.id,
      phone: eventData.phone,
      website: eventData.website,
    };
    return formatedData;
  };

  const onSubmit = async eventData => {
    // console.log('this is the eventData in onSubmit: ', eventData);
    console.log('the data sending to back-end: ', apiAdaptor(eventData));
    console.log('the auth: ', auth);
    if (Steps.slice(0, 2).some(s => s['error'] === undefined)) toast.error('لطفا ابتدا تمامی مراحل را بگذرونید.');
    else if (Steps.some(s => s['error'] === true)) toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
    else
      toast
        .promise(mutateAsync(apiAdaptor(eventData)), {
          loading: 'در حال بررسی...',
          success: res => {
            return 'رویداد به پشتیبانی ارسال شد و در صورت تایید ادمین به لیست رویداد ها اضافه میشود';
          },
          error: err => {
            if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
            else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
          },
        })
        .then(res => {
          // if (eventData.images.length === 0) return;
          const form_data = new FormData();
          if (eventData.images.length === 0) {
            navigate(`/events/${res.data['id']}`);
            return;
          } else {
            eventData.images.forEach((img, i) => {
              form_data.append('images', img);
            });
          }
          form_data.append('address', eventData.address);
          form_data.append('city', eventData.city.label);
          form_data.append('province', eventData.state.label);
          form_data.append('title', eventData.name);
          form_data.append('organizer', eventData.organizer);
          form_data.append('description', eventData.summary);
          form_data.append('x_location', eventData.latitude);
          form_data.append('y_location', eventData.longitude);
          form_data.append('start_date', eventData.startDate);
          form_data.append('end_date', eventData.endDate);
          form_data.append('start_time', eventData.startTime);
          form_data.append('end_time', eventData.endTime);
          form_data.append('phone', eventData.phone);
          form_data.append('website', eventData.website);
          form_data.append('is_free', eventData.isFree);
          toast
            .promise(updateEvent(res.data['id'], form_data), {
              loading: 'در حال آپلود تصاویر...',
              success: res => {
                return 'تصاویر با موفقیت اضافه شد.';
              },
              error: err => {
                if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
                else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
              },
            })
            .then(res => {
              navigate(`/events/${res.data['id']}`);
            })
            .catch(err => {
              console.log(err);
            });
        });
  };

  const AddEventSections = [BaseInfoSection, MapSection, TimeAndDateSection, AdditionalInfoSection];
  const AddEventSection = AddEventSections[preStep];

  return (
    <Layout title="اضافه کردن رویداد جدید">
      <div className="add-event">
        <FormProvider {...methods}>
          <Stepper steps={Steps} activeStep={activeStep} setActiveStep={s => methods.setValue('activeStep', s)} />
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className="add-event__section">
              <AddEventSection />
              <>
                {activeStep !== 3 ? (
                  <Button variant="green" onClick={() => methods.setValue('activeStep', activeStep + 1)}>
                    ادامه
                  </Button>
                ) : (
                  preStep !== 2 && (
                    <Button type="submit" variant="green" disabled={isLoading}>
                      ثبت رویداد
                    </Button>
                  )
                )}
              </>
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
};

export default AddEvent;
