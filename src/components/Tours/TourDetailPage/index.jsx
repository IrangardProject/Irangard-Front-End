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

function ToursDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const [pageLoading, setPageLoading] = useState(true);
  const [data, setData] = useState({});
  const [code, setCode] = useState('');
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  useEffect(() => {
    apiInstance
      .get(`/tours/${id}`)
      .then(res => res.data)
      .then(data => {
        console.log(data);
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
      toast.error('ابتدا وارد حساب کاربری خود شوید.');
      return;
    }
    setRegisterModalOpen(true);
    return;
  };

  const handleSubmitBookTour = e => {
    e.preventDefault();
    apiInstance
      .post(`/tours/${id}/book/`, {
        discount_code_code: code,
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
          <img className="tour-detail__img" src={data.image || defaultTourImg} />
          <div className="tour-detail__date">
            <div className="tour-detail__start">تاریخ رفت: {formatDate(data.start_date)}</div>
            <div className="tour-detail__end">تاریخ برگشت: {formatDate(data.end_date)}</div>
          </div>
          <div className="tour-detail__capacity">
            ظرفیت تور: {convertNumberToPersian(data.capacity - data.bookers.length)} نفر
          </div>
          <div className="tour-detail__cost">قیمت تور: {formatPrice(convertNumberToPersian(data.cost))} تومان</div>
          {!data.is_booked && (
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
        <form onSubmit={handleSubmitBookTour} className="tour-detail__register-modal">
          <Input label="کد تخفیف:" placeholder="کد تخفیف..." value={code} onChange={e => setCode(e.target.value)} />
          <Button type="submit" className="tour-detail__book">
            ثبت‌نام در تور
          </Button>
        </form>
      </Modal>
    </Layout>
  );
}

export default ToursDetailPage;