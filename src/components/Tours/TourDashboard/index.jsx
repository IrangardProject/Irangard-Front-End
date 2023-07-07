import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import apiInstance from 'src/config/axios';
import Loader from '../../Loader';
import EditTourTab from '../EditTourTab';
import TourAttendeesTab from '../TourAttendeesTab';
import DiscountSystemTab from '../DiscountSystemTab';
import Layout from '../../Layout';
import './style.scss';

function TourDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(async () => {
    try {
      const userData = await apiInstance.get('/accounts/information').then(res => res.data);
      const tourData = await apiInstance.get(`/tours/${id}`).then(res => res.data);
      setData(tourData);
      console.log("the data in if: ", tourData, userData);
      if (tourData?.owner.user.id !== userData.id) {
        navigate('/notFound');
      }
    } catch (error) {
      console.log(error);
      navigate('/notFound');
    }
    setPageLoading(false);
  }, []);
  return (
    <Layout>
      {pageLoading && <Loader />}
      {!pageLoading && (
        <div className="tour-dashboard">
          <div className="tour-dashboard__tabs">
            <div
              onClick={() => setActiveTab(0)}
              className={classNames('tour-dashboard__tab', { 'tour-dashboard__tab--active': activeTab === 0 })}
            >
              ویرایش تور
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className={classNames('tour-dashboard__tab', { 'tour-dashboard__tab--active': activeTab === 1 })}
            >
              شرکت‌کنندگان تور
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className={classNames('tour-dashboard__tab', { 'tour-dashboard__tab--active': activeTab === 2 })}
            >
              کدهای تخفیف
            </div>
            <div onClick={() => navigate(`/tours/${id}`)} className={classNames('tour-dashboard__tab')}>
              رفتن صفحه عمومی تور
            </div>
          </div>
          <div className="tour-dashboard__tabs-content">
            {activeTab === 0 && <EditTourTab data={data} />}
            {activeTab === 1 && <TourAttendeesTab data={data.bookers} />}
            {activeTab === 2 && <DiscountSystemTab />}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default TourDashboard;
