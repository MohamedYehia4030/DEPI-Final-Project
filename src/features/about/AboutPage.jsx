import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AboutPage.module.css';
import AboutHero from './AboutHero';
import AboutStats from './AboutStats';
import AboutFeatures from './AboutFeatures';
import Testimonials from '../../features/shared/components/Testimonials/Testimonials';

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <div className={styles.aboutPage}>
      <AboutHero />
      <AboutStats />
      <AboutFeatures />
      <Testimonials />
    </div>
  );
};

export default AboutPage;