import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'src/components/HomePage';
import NotFoundPage from 'src/components/NotFoundPage';
import Profile from 'src/components/Profile';
import AddExperience from '../components/AddExperience';
import ExperienceDetail from '../components/ExperienceDetail';
import Experiences from '../components/Experiences';
import Feed from '../components/Feed';
import PlaceDetailPage from '../components/places/PlaceDetailPage';
import ForgetPassword from 'src/components/LoginModal/ForgetPassword';
import AddTour from 'src/components/Tours/AddTour';
import ToursDetailPage from 'src/components/Tours/TourDetailPage';
import ToursList from 'src/components/Tours/ToursList';
import TourDashboard from 'src/components/Tours/TourDashboard';
import AdminPanel from '../components/AdminPanel';
import AddRemoveUser from 'src/components/AdminPanel/AddOrRemove';
import StaticsPage from 'src/components/AdminPanel/StaticsPage';
import Chat from 'src/components/Chat';
import ChatLayout from 'src/components/Chat/ChatLayout';
import CityExperiences from '../components/CityExperiences';

import AddPlaces from 'src/components/AddPlaces';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <Chat />
            </>
          }
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/places/:placeId" element={<PlaceDetailPage />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/experiences/new" element={<AddExperience />} />
        <Route path="/experiences/:id" element={<ExperienceDetail />} />
        <Route path="/city-experiences/:city" element={<CityExperiences />} />
        <Route path="/tours" element={<ToursList />} />
        <Route path="/tours/new" element={<AddTour />} />
        <Route path="/tours/:id" element={<ToursDetailPage />} />
        <Route path="/tours/:id/dashboard" element={<TourDashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/panel" element={<AdminPanel />} />
        <Route path="/penal/statics" element={<StaticsPage />} />
        <Route path="/panel/addremove" element={<AddRemoveUser />} />
        <Route path="/launcher" element={<ChatLayout />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/add-new-places" element={<AddPlaces />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
