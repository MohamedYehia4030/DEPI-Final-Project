import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HeroSection.module.css';
import HeroSearchForm from '../HeroSearchForm/HeroSearchForm';
import background1 from '../../../../assets/images/Home/Home-Background-1.png';
import background2 from '../../../../assets/images/Home/Home-Background-2.png';

const backgrounds = [background1, background2];

const HeroSection = () => {
  const { t } = useTranslation('home');
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroSection}>
      <div className={styles.backgroundContainer}>
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`${styles.backgroundImage} ${
              index === currentBackground ? styles.active : ''
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{t('heroTitle', 'Enjoy in the best way!')}</h1>
        <p className={styles.heroSubtitle}>
          {t('heroSubtitle', 'Enjoy our services for your trip anytime')}
        </p>
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default HeroSection;
