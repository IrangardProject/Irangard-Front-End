import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import apiInstance from 'src/config/axios';
import Loader from '../../Loader';
import EditEventTab from '../EditEventTab';
import EventAttendeesTab from '../EventAttendeesTab';
import Layout from '../../Layout';
import './styles.scss';

function EventDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  useEffect(async () => {
    try {
      const userData = await apiInstance.get('/accounts/information').then(res => res.data);
      const eventData = await apiInstance.get(`/events/${id}`).then(res => res.data);
      setData(eventData);
      console.log("the data in if: ", eventData, userData);
      if (eventData?.added_by.id !== userData.id) {
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
        <div className="event-dashboard">
          <div className="event-dashboard__tabs">
            <div
              onClick={() => setActiveTab(0)}
              className={classNames('event-dashboard__tab', { 'event-dashboard__tab--active': activeTab === 0 })}
            >
              ویرایش رویداد
            </div>
            <div
              onClick={() => setActiveTab(1)}
              className={classNames('event-dashboard__tab', { 'event-dashboard__tab--active': activeTab === 1 })}
            >
              شرکت‌کنندگان رویداد
            </div>
            <div onClick={() => navigate(`/events/${id}`)} className={classNames('event-dashboard__tab')}>
              رفتن صفحه عمومی رویداد
            </div>
          </div>
          <div className="event-dashboard__tabs-content">
            {activeTab === 0 && <EditEventTab data={data} />}
            {activeTab === 1 && <EventAttendeesTab data={data.bookers} />}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default EventDashboard;
