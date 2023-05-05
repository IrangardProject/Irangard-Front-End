import React from 'react';
import Helmet from 'react-helmet';
import Header from 'src/components/Header';
import Navbar from 'src/components/Navbar';
import CitySlider from 'src/components/CitySlider';
import IranMap from 'src/components/IranMap';
import SearchBar from 'src/components/SearchBar/index';
import ExperienceSlider from 'src/components/ExperienceSlider/index';
import Footer from 'src/components/Footer';
import Testimonial from 'src/components/Testimonial';
import FavouriteEvents from '../FavouriteEvent';
import TourCategories from 'src/components/TourCategories';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Helmet>
        <title>ایرانگرد</title>
      </Helmet>
      <SearchBar />
      <CitySlider />
      <FavouriteEvents/>
      <IranMap />
      <Testimonial />
      <ExperienceSlider />
      <TourCategories />
      <Footer />
    </>
  );
};

export default HomePage;
