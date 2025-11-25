import React from "react";
import HeroSection from "../../home/components/HeroSection";
import PopularDestinations from "../../home/components/PopularDestinations";
import ExploreCategories from "../../home/components/ExploreCategories";
import PopularTransport from "../../home/components/PopularTransport";
import TravelTips from "../../home/components/TravelTips";
import OffersCTA from "../../home/components/OffersCTA";
import BikeBookingForm from "../../../components/BikeBookingForm/BikeBookingForm.jsx";
import styles from "./HomeScreen.module.css";

export default function HomePage() {
  return (
    <div className={styles.HomePage}>
      <HeroSection />
      <PopularDestinations />
      <ExploreCategories />
      <PopularTransport />
      <BikeBookingForm />
      <TravelTips />
      <OffersCTA />
    </div>
  );
}
