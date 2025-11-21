import React from 'react';
import HeroSection from '../../home/components/HeroSection';
import PopularDestinations from '../../home/components/PopularDestinations';
import ExploreCategories from '../../home/components/ExploreCategories';
import PopularTransport from '../../home/components/PopularTransport';
import TravelTips from '../../home/components/TravelTips';
import OffersCTA from '../../home/components/OffersCTA';

export default function HomePage() {

  return (
    <div className="HomePage">
      <HeroSection />
      <PopularDestinations />
      <ExploreCategories />
      <PopularTransport />
      <TravelTips />
      <OffersCTA />
   
    </div>
  );
}
