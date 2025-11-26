import React from "react";
import AboutHero from "../../about/components/AboutHero";
import AboutStats from "../../about/components/AboutStats";
import AboutFeatures from "../../about/components/AboutFeatures";
import Reviews from '../../reviews/components/Reviews';

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <AboutStats />
      <AboutFeatures />
    <div className="AboutPage">
<br />
<br />
<br />
<br />
<br />
    <Reviews /> 
    </div>
  );
};

export default AboutPage;
