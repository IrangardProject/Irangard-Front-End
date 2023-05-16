import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@mui/material';
import apiInstance from '../../../config/axios';
import Layout from '../../Layout';
import Button from '../../Button';
import Input from 'src/components/Input';
import Loader from '../../Loader';
import RichText from '../../RichText';
import { convertNumberToPersian, formatDate, formatPrice } from '../../../utils/formatters';
import useAuth from 'src/context/AuthContext';
import './style.scss';
import defaultTourImg from 'src/assets/images/defaultTourImg.jpeg';
import toast, { Toaster } from 'react-hot-toast';
import { Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@mui/material';
import { BsCreditCard2Back } from 'react-icons/bs';
import { IoWalletOutline } from 'react-icons/io5';

function ToursDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [newCost, setNewCost] = useState(null);
  const [data, setData] = useState({});
  const [code, setCode] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('درگاه پرداخت اینترنتی');
  useEffect(() => {
    apiInstance
      .get(`/tours/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log('data fetched: ', data);
        setData(data);
      })
      .catch(error => {
        console.log(error);
        navigate('/notFound');
      })
      .finally(() => setPageLoading(false));
  }, []);

  const onClose = () => {
    setRegisterModalOpen(false);
  };

  const handleBookTour = () => {
    if (!auth.isLoggedIn) {
      toast.error('برای ثبت‌نام در تور ابتدا وارد حساب کاربری خود شوید.', { className: 'centered-toast-message' });
      return;
    }
    setRegisterModalOpen(true);
    return;
  };

  const handleSubmitBookTour = e => {
    e.preventDefault();
    apiInstance
      .post(`/tours/${id}/book/`, {
        // discount_code_code: code,
      })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        window.location.href = data.link;
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDiscountCodeSubmit = e => {
    e.preventDefault();
    apiInstance
      .post(`tours/${id}/apply_discount_code/`, {
        discount_code_code: code,
      })
      .then(res => res.data)
      .then(data => {
        toast.success('کد تخفیف با موفقیت اعمال شد.');
        setNewCost(data.new_cost);
      })
      .catch(err => {
        toast.error('کد تخفیف اشتباه است.');
        setNewCost(null);
      });
  };

  return (
    <Layout title="صفحه تور">
      <Toaster />
      {pageLoading && <Loader />}
      {!pageLoading && (
        <div className="tour-detail">
          <h1 className="tour-detail__title">{data.title}</h1>
          {data.owner.user === auth.user?.id && (
            <p onClick={() => navigate(`/tours/${id}/dashboard`)} className="tour-detail__goto-dashboard">
              رفتن به داشبورد
            </p>
          )}
          {console.log('this is the data: ', data)}
          <img className="tour-detail__img" src={data.image || defaultTourImg} />
          <div className="tour-detail__date">
            <div className="tour-detail__start">تاریخ رفت: {formatDate(data.start_date)}</div>
            <div className="tour-detail__end">تاریخ برگشت: {formatDate(data.end_date)}</div>
          </div>
          <div className="tour-detail__capacity">
            ظرفیت تور: {convertNumberToPersian(data.capacity - data.bookers.length)} نفر
          </div>
          <div className="tour-detail__cost">قیمت تور: {formatPrice(convertNumberToPersian(data.cost))} ریال</div>
          {!data.is_booked && data.owner.user !== auth.user?.id && (
            <Button className="tour-detail__book" onClick={handleBookTour}>
              ثبت‌نام در تور
            </Button>
          )}
          {data.description && data.description !== '<p></p>' && (
            <>
              <div className="tour-detail__description">توضیحات تور:</div>
              <RichText
                readOnly
                editorClassName="tour-detail__description-editor"
                hideToolbar
                defaultContent={data.description}
              />
            </>
          )}
        </div>
      )}
      <Modal
        open={registerModalOpen}
        onClose={onClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="tour-detail__register-modal">
          <div className="tour-detail__register-modal__title">ثبت‌نام در تور</div>
          <div className="tour-detail__register-modal__form-container">
            <form className="tour-detail__register-modal__form-container__form" onSubmit={handleDiscountCodeSubmit}>
              <Input
                // label="کد تخفیف:"
                className="tour-detail__register-modal__form-container__form__input"
                placeholder="کد تخفیف..."
                value={code}
                onChange={e => setCode(e.target.value)}
              />
              <Button className="tour-detail__register-modal__form-container__form__submit" type="submit">
                اعمال کد تخفیف
              </Button>
            </form>
          </div>
          {newCost && (
            <>
              <p className="tour-detail__code-stroke">
                قیمت تور قبل از اعمال تخفیف: {formatPrice(convertNumberToPersian(data.cost))} تومان
              </p>
              <p className="tour-detail__code-success">
                قیمت تور پس از اعمال تخفیف: {formatPrice(convertNumberToPersian(newCost))} تومان
              </p>
            </>
          )}
          <hr className="tour-detail__hr" />
          <div className="tour-detail__register-modal__payment-way-container">
            <FormControl>
              <FormLabel>روش پرداخت</FormLabel>
              <RadioGroup
                // sx={{
                //   '& .MuiFormControlLabel-root': {
                //     borderWidth: '2px',
                //     borderColor: '#000',
                //     borderRadius: '4px', // Optional: Add border radius if desired
                //   },
                // }}
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  style={{
                    marginTop: '15px',
                    width: '500px',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    padding: '8px',
                  }}
                  value="درگاه پرداخت اینترنتی"
                  control={<Radio />}
                  // label="درگاه پرداخت اینترنتی"
                  label={
                    <div className="online-payment">
                      <IoWalletOutline fontSize={20}/>
                      <p className="online-payment__text">درگاه پرداخت اینترنتی</p>
                      {/* <p>مبلغ قابل پرداخت: {formatPrice(convertNumberToPersian(newCost || data.cost))} ریال</p> */}
                      {/* <p>موجودی کافی</p> */}
                    </div>
                  }
                />
                <FormControlLabel
                  style={{
                    marginBottom: '15px',
                    width: '500px',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    padding: '8px',
                    marginTop: '5px',
                  }}
                  value="کیف پول ایران‌گرد"
                  control={<Radio />}
                  label="کیف پول ایران‌گرد"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="tour-detail__submit-button-container">
            <Button type="button" className="tour-detail__book-modal" onClick={handleSubmitBookTour}>
              پرداخت{' '}
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default ToursDetailPage;
