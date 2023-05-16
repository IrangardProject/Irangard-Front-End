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
import ChatPage from '../components/AdminPanel/ChatPage';
import StaticsPage from 'src/components/AdminPanel/StaticsPage';
import ChatList from 'src/components/AdminPanel/ChatList';
import Chat from 'src/components/Chat';
import ChatLayout from 'src/components/Chat/ChatLayout';
import CityExperiences from '../components/CityExperiences';
import AddPlaces from 'src/components/AddPlaces';
import PlaceFilters from 'src/components/PlaceFilters';
import AddEvent from 'src/components/Events/AddEvent';
import EventDetailsPage from 'src/components/Events/EventDetailsPage';
import EventDashboard from 'src/components/Events/EventDashboard';
import EventsList from 'src/components/Events/EventsList';
import PlaceThingsToDo from 'src/components/PlaceThingsToDo';
import AdminVerify from '../components/AdminPanel/AdminVarify';
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
        <Route path="/panel/statics" element={<StaticsPage />} />
        <Route path="/panel/addremove" element={<AddRemoveUser />} />
        <Route path="/panel/chat" element={<ChatList />} />
        <Route path="/panel/chatPage/:username" element={<ChatPage />} />
        <Route path="/launcher" element={<ChatLayout />} />
        <Route path="/Search" x element={<PlaceFilters />} />
        <Route path="/places/new" x element={<AddPlaces />} />
        <Route path="/Search" x element={<PlaceFilters />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/new" element={<AddEvent />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/events/:id/dashboard" element={<EventDashboard />} />
        <Route path='/panel/verify' element={<AdminVerify/>} />
        {/* <Route path="/things-to-do" element={<PlaceThingsToDo />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
