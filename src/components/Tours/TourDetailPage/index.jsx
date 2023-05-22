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
import ShareIcon from '@mui/icons-material/Share';
import ShareModal from '../../ShareModal/shareModal';
import { RiSettings5Line } from 'react-icons/ri';
import { BsCalendarDate } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import ByUser from './ByUser';
import TourTags from './TourTags';
import TourGallery from './TourGallery';
import TourContactInfo from './TourContactInfo';

function ToursDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  console.log('the user: ', auth);
  const [pageLoading, setPageLoading] = useState(true);
  const [newCost, setNewCost] = useState(null);
  const [data, setData] = useState({});
  const [code, setCode] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('درگاه پرداخت اینترنتی');
  const [showDiscountBox, setShowDiscountBox] = useState(true);
  const [userWalletButtonDisabled, setUserWalletButtonDisabled] = useState(!(auth.user?.wallet_credit < data.cost));
  console.log(userWalletButtonDisabled, data.cost, auth.user?.wallet_credit);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

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

  useEffect(() => {
    if (newCost === null) {
      setShowDiscountBox(true);
    } else {
      setShowDiscountBox(false);
    }
  }, [newCost]);

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
    if (paymentMethod === 'درگاه پرداخت اینترنتی') {
      apiInstance
        .post(`/tours/${id}/book/`, {})
        .then(res => res.data)
        .then(data => {
          console.log(data);
          window.location.href = data.link;
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      apiInstance
        .post(`/tours/${id}/book_with_wallet/`, {})
        .then(res => res.data)
        .then(data => {
          console.log('the result of booking the tour', data);
          toast.success('تور با موفقیت رزرو شد.');
          window.location.reload();
          navigate('/tours');
        });
    }
  };
  const handleOpen = () => {
    setEditProfileModalOpen(true);
  };

  const handleDiscountCodeSubmit = e => {
    e.preventDefault();
    apiInstance
      .post(`tours/${id}/apply_discounts/`, {
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

  const findNumberOfDays = (endDate, startDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Layout title="صفحه تور">
      <Toaster />
      {pageLoading && <Loader />}
      {!pageLoading && (
        <div className="tour-detail">
          <header className="title-and-icon">
            <h1 className="tour-detail__title">{data.title}</h1>
            <div className="share-icon-container">
              <ShareIcon
                onClick={handleOpen}
                sx={{
                  marginRight: '20px',
                  color: 'green',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                  padding: '2px 1px',
                }}
              />
              <span className="tooltip-text">به اشتراک گذاشتن تور</span>
            </div>
            <div className="title-and-icon__dashboard">
              {data.owner.user === auth.user?.id && (
                <button onClick={() => navigate(`/tours/${id}/dashboard`)} className="tour-detail__goto-dashboard">
                  <span>رفتن به داشبورد</span>
                  <span>
                    <RiSettings5Line size={20} />
                  </span>
                </button>
              )}
            </div>
            {!data.is_booked && data.owner.user !== auth.user?.id && (
              <Button className="tour-detail__book" onClick={handleBookTour}>
                ثبت‌نام در تور
              </Button>
            )}
          </header>
          <div className="tour-detail__gallery-info-wrapper">
            <TourGallery className="tour-detail__gallery" images={data.images} />
            <TourContactInfo className="tour-detail__contact-info" info={data} />
          </div>
          <ByUser />

          <div className="tour-detail__body">
            <div className="tour-detail__date">
              <div className="tour-detail__date-and-time__icon">
                <BsCalendarDate size={24} />
              </div>
              <div className="tour-detail__date_text">
                <h3>تاریخ برگزاری تور</h3>
                <p>
                  تاریخ رفت:‌ {formatDate(data.start_date)} <br />
                </p>
                <p>
                  تاریخ برگشت:‌ {formatDate(data.end_date)} <br />
                </p>
                <p>
                  مدت تور: {findNumberOfDays(data.end_date, data.start_date)} روز <br />
                </p>
              </div>
            </div>
            <div className="tour-detail__capacity">
              <div className="tour-detail__capacity__icon">
                <BsFillPeopleFill size={24} />
              </div>
              <div className="tour-detail__capacity__text">
                <h3>ظرفیت تور</h3>
                <p>ظرفیت تور: {convertNumberToPersian(data.capacity - data.bookers.length)} نفر</p>
              </div>
            </div>
            <div className="tour-detail__description">
              <div className="tour-detail__description__icon">
                <MdOutlineDescription size={24} />
              </div>
              {/* <div className="tour-detail__description__text">
                <h3>درباره تور</h3>
                <p>{data.description}</p>
              </div> */}
              <>
                <div className="tour-detail__description">توضیحات تور:</div>
                <RichText
                  readOnly
                  editorClassName="tour-detail__description-editor"
                  hideToolbar
                  defaultContent={data.description}
                />
              </>
            </div>
            {data.tags && (
              <div className="tour-detail__available-tags">
                <TourTags tags={data.tags} />
              </div>
            )}
          </div>
          {/* {console.log('this is the data: ', data)}
          <img className="tour-detail__img" src={data.image || defaultTourImg} />
          <div className="tour-detail__capacity">
            ظرفیت تور: {convertNumberToPersian(data.capacity - data.bookers.length)} نفر
          </div>
          <div className="tour-detail__cost">قیمت تور: {formatPrice(convertNumberToPersian(data.cost))} تومان</div>
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
          )} */}
        </div>
      )}
      <Modal
        open={registerModalOpen}
        onClose={onClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="tour-detail__register-modal">
          <div className="tour-detail__register-modal__title">ثبت‌نام در تور</div>
          {showDiscountBox && (
            <div className="tour-detail__register-modal__form-container">
              <form className="tour-detail__register-modal__form-container__form" onSubmit={handleDiscountCodeSubmit}>
                <Input
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
          )}
          {!showDiscountBox && newCost && (
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
              <FormLabel className="form-label-title">روش پرداخت</FormLabel>
              <RadioGroup value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                <FormControlLabel
                  style={{
                    marginTop: '15px',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    padding: '8px',
                  }}
                  className="form-control-label-box"
                  value="درگاه پرداخت اینترنتی"
                  control={<Radio />}
                  label={
                    <div className="online-payment">
                      <IoWalletOutline fontSize={20} />
                      <p className="online-payment__text">درگاه پرداخت اینترنتی</p>
                    </div>
                  }
                />
                <FormControlLabel
                  style={{
                    marginBottom: '15px',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    padding: '8px',
                    marginTop: '5px',
                  }}
                  className="form-control-label-box"
                  value="کیف پول ایران‌گرد"
                  control={<Radio />}
                  label={
                    <div className="user-wallet-payment">
                      <div className="user-wallet-payment__icon">
                        <BsCreditCard2Back fontSize={20} />
                      </div>
                      <div className="user-wallet-payment__text">
                        <p className="user-wallet-payment__text__title">کیف پول ایران‌گرد</p>
                        <p className="user-wallet-payment__text__description">
                          {auth.user?.wallet_credit >= (newCost || data.cost) ? (
                            <p className="user-wallet-payment__text__description__enough-credit">موجودی کافی</p>
                          ) : (
                            <p className="user-wallet-payment__text__description__no-credit">موجودی ناکافی</p>
                          )}
                        </p>
                      </div>
                    </div>
                  }
                  // disabled={userWalletButtonDisabled}
                  disabled={auth.user?.wallet_credit < (newCost || data.cost)}
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
      <ShareModal open={editProfileModalOpen} handleClose={() => setEditProfileModalOpen(false)} shareType={'تور'} />
    </Layout>
  );
}

export default ToursDetailPage;
