import React from 'react';
import styles from './HomePage.module.css';
import HeroSection from './HeroSection';
import PopularDestinations from './PopularDestinations';
import TravelTips from './TravelTips';
import OffersCTA from './OffersCTA';
import ExploreCategories from './ExploreCategories';
import BikeBookingForm from '../../features/bookings/BookingForm';
import PopularTransport from './PopularTransport';
import Testimonials from '../../features/shared/components/Testimonials/Testimonials';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <PopularDestinations />
      <TravelTips />
      <OffersCTA />
      <ExploreCategories />
      <BikeBookingForm />
      <PopularTransport />
      <Testimonials />
    </div>
  );
};

export default HomePage;