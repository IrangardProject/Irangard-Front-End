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
import { BaseInfoSection, MapSection, TimeAndDateSection, AdditionalInfoSection } from './Sections';
import { useAddEvent, updateEvent } from 'src/api/Events';
import './styles.scss';

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
      eventCategory: '',
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
    },
  });

  // const eventType = methods.watch('eventType');
  const activeStep = methods.watch('activeStep');
  const [preStep, setPreStep] = useState(activeStep);
  const onError = (errors, e) => toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useAddEvent();

  useEffect(async () => {
    const stepFields = Steps[preStep].fields;
    const isOkay = await methods.trigger(stepFields);
    Steps[preStep]['error'] = !isOkay;
    setPreStep(activeStep);
  }, [activeStep]);

  // useEffect(() => {
  //   const subscription = methods.watch((value, { name, type }) => {
  //     methods.trigger(name);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [methods.watch]);

  const onSubmit = async eventData => {};

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
