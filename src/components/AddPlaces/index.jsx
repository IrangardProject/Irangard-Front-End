import React from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import Layout from 'src/components/Layout';
import Stepper from 'src/components/Stepper';
import { useAddPlace } from 'src/api/places';
import useAuth from 'src/context/AuthContext';
import { BaseInfoSection, MapSection, ContactSection, MoreInfoSection } from './Sections';
import { AddPlaceSteps } from './info';
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
  const methods = useForm({
    defaultValues: { activeStep: 0, placeType: -1, state: '', city: '' },
  });
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
    toast.promise(mutateAsync(apiAdaptor(placeData)), {
      loading: 'در حال بررسی...',
      success: res => {
        return 'مکان با موفقیت اضافه شد.';
      },
      error: err => {
        if (!err.response) return 'خطا در ارتباط با سرور! اینترنت خود را بررسی کنید';
        else return `مشکلی پیش اومده است، دوباره امتحان کنید.`;
      },
    });
  };

  const AddPlaceSections = [BaseInfoSection, MapSection, ContactSection, MoreInfoSection];

  const AddPlaceSection = AddPlaceSections[methods.watch('activeStep')];

  return (
    <Layout title="اضافه کردن مکان جدید">
      <div className="add-place">
        <FormProvider {...methods}>
          <Stepper steps={AddPlaceSteps} activeStep={methods.watch('activeStep')} />
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="add-place__section">
              <AddPlaceSection />
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}
