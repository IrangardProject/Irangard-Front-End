import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import Layout from 'src/components/Layout';
import { EnhancedStepper as Stepper } from 'src/components/Stepper';
import Button from 'src/components/Button';
import useAuth from 'src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from 'src/utils/constants';
import { AddTourSteps as Steps } from './info';
import { tourCategories } from 'src/utils/constants';
import { BaseInfoSection, MapSection, DateSection, AdditionalInfoSection } from './Sections';
import { useAddTour, updateTour } from 'src/api/Tours';
import './styles.scss';
import { convertJalaliDateToGeorgian } from 'src/utils/formatters';

const AddTour = () => {
  const auth = useAuth();
  if (!auth.isLoggedIn) {
    return (
      <Layout title="اضافه کردن تور جدید">
        <div className="add-tour__no-auth">
          <p>برای اضافه کردن تور ابتدا باید وارد شوید.</p>
        </div>
      </Layout>
    );
  }

  const methods = useForm({
    defaultValues: {
      activeStep: 0,
      name: '',
      tourCategory: '',
      tourCategoryIndex: 0,
      tags: [],
      state: '',
      city: '',
      address: '',
      longitude: '',
      latitude: '',
      startDate: '',
      endDate: '',
      summary: '',
      images: [],
      phone: '',
    },
  });

  const activeStep = methods.watch('activeStep');
  const [preStep, setPreStep] = useState(activeStep);
  const onError = (errors, e) => toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useAddTour();

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

  const apiAdaptor = tourData => {
    const formatedData = {
      title: tourData.tourName,
      cost: tourData.tourPrice,
      capacity: tourData.tourCapacity,
      remaining: tourData.tourCapacity,
      tour_type: tourData.tourCategoryIndex,
      x_location: tourData.latitude,
      y_location: tourData.longitude,
      // start_date: tourData.startDate,
      start_date: convertJalaliDateToGeorgian(tourData.startDate.toString()) + `T00:00`,
      // end_date: tourData.endDate,
      end_date: convertJalaliDateToGeorgian(tourData.endDate.toString()) + `T00:00`,
      province: tourData.state.label,
      city: tourData.city.label,
      description: tourData.summary,
      tags: tourData.tags.map(tag => {
        return {
          name: tag,
        };
      }),
      address: tourData.address,
      owner: auth.user.id,
      phone: tourData.phone,
      website: tourData.website,
    };
    return formatedData;
  };

  const onSubmit = async tourData => {
    // console.log('this is the tourData in onSubmit: ', tourData);
    console.log('the data sending to back-end: ', apiAdaptor(tourData));
    console.log('the auth: ', auth);
    if (Steps.slice(0, 2).some(s => s['error'] === undefined)) toast.error('لطفا ابتدا تمامی مراحل را بگذرونید.');
    else if (Steps.some(s => s['error'] === true)) toast.error('لطفا مشکلات مراحلی که علامت هشدار دارند، را رفع کنید.');
    else
      toast
        .promise(mutateAsync(apiAdaptor(tourData)), {
          loading: 'در حال بررسی...',
          success: res => {
            return 'تور به پشتیبانی ارسال شد و در صورت تایید ادمین به لیست تور ها اضافه میشود';
          },
          error: err => {
            if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
            else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
          },
        })
        .then(res => {
          // if (tourData.images.length === 0) return;
          const form_data = new FormData();
          if (tourData.images.length === 0) {
            navigate(`/tours`);
            return;
          } else {
            tourData.images.forEach((img, i) => {
              form_data.append('images', img);
            });
          }
          form_data.append('address', tourData.address);
          form_data.append('city', tourData.city.label);
          form_data.append('province', tourData.state.label);
          form_data.append('title', tourData.tourName);
          form_data.append('description', tourData.summary);
          form_data.append('x_location', tourData.latitude);
          form_data.append('y_location', tourData.longitude);
          form_data.append('start_date', convertJalaliDateToGeorgian(tourData.startDate.toString()) + `T00:00`);
          form_data.append('end_date', convertJalaliDateToGeorgian(tourData.endDate.toString()) + `T00:00`);
          form_data.append('phone', tourData.phone);
          toast
            .promise(updateTour(res.data['id'], form_data), {
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
              navigate(`/tours`);
            })
            .catch(err => {
              console.log(err);
            });
        });
  };

  const AddTourSections = [BaseInfoSection, MapSection, DateSection, AdditionalInfoSection];
  const AddTourSection = AddTourSections[preStep];

  return (
    <Layout title="ثبت تور جدید">
      <div className="add-tour">
        <FormProvider {...methods}>
          <Stepper steps={Steps} activeStep={activeStep} setActiveStep={s => methods.setValue('activeStep', s)} />
          <form onSubmit={methods.handleSubmit(onSubmit, onError)}>
            <div className="add-tour__section">
              <AddTourSection />
              <>
                {activeStep !== 3 ? (
                  <Button variant="green" onClick={() => methods.setValue('activeStep', activeStep + 1)}>
                    ادامه
                  </Button>
                ) : (
                  preStep !== 2 && (
                    <Button type="submit" variant="green" disabled={isLoading}>
                      ثبت تور
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

export default AddTour;
