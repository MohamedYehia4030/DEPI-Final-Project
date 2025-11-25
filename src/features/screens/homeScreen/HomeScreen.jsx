import React from "react";
import HeroSection from "../../home/components/HeroSection";
import PopularDestinations from "../../home/components/PopularDestinations";
import ExploreCategories from "../../home/components/ExploreCategories";
import PopularTransport from "../../home/components/PopularTransport";
import TravelTips from "../../home/components/TravelTips";
import BikeBookingForm from "../../../components/BikeBookingForm/BikeBookingForm.jsx";
import styles from "./HomeScreen.module.css";
import Reviews from "../../reviews/components/Reviews.jsx";

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      <HeroSection />
      <PopularDestinations />
      <ExploreCategories />
      <PopularTransport />
      <BikeBookingForm />
      <TravelTips />
      <Reviews/>
    </div>
  );
}
