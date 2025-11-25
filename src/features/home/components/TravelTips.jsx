import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaCity, FaTag, FaCheck, FaCar, FaMapMarkerAlt, FaBus, FaTicketAlt } from 'react-icons/fa';
import styles from './TravelTips.module.css';

import packageImage1 from '../../../assets/images/Home/explore-img1.png';
import packageImage2 from '../../../assets/images/Home/explore-img2.png';
import packageImage3 from '../../../assets/images/Home/explore-img3.png';
import packageImage4 from '../../../assets/images/Home/transport-img3.png';

const packagesData = [
  {
    key: 'package1',
    titleKey: 'package1_title',
    price: '10',
    unit: '/day',
    image: packageImage1,
    features: [
      { textKey: 'f1_bike_day', icon: FaCheck },
      { textKey: 'f2_city_app', icon: FaMobileAlt },
      { textKey: 'f3_discount', icon: FaTag },
      { textKey: 'f4_support', icon: FaCheck },
    ]
  },
  {
    key: 'package2',
    titleKey: 'package2_title',
    price: '30',
    unit: '/day',
    image: packageImage2,
    features: [
      { textKey: 'f1_mountain_bike', icon: FaCheck },
      { textKey: 'f2_guide', icon: FaCheck },
      { textKey: 'f3_water', icon: FaCheck },
      { textKey: 'f4_support', icon: FaCheck },
    ]
  },
  {
    key: 'package3',
    titleKey: 'package3_title',
    price: '45',
    unit: '/day',
    image: packageImage3,
    features: [
      { textKey: 'f1_park_ticket', icon: FaTicketAlt },
      { textKey: 'f2_return_bus', icon: FaBus },
      { textKey: 'f3_companion', icon: FaCheck },
      { textKey: 'f4_support', icon: FaCheck },
    ]
  },
  {
    key: 'package4',
    titleKey: 'package4_title',
    price: '10',
    unit: '/day',
    image: packageImage4,
    features: [
      { textKey: 'f1_personal_driver', icon: FaCar },
      { textKey: 'f2_wherever_you_want', icon: FaMapMarkerAlt },
      { textKey: 'f3_best_price', icon: FaTag },
      { textKey: 'f4_support', icon: FaCheck },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const PopularPackages = () => {
  const { t } = useTranslation('home');

  return (
    <div className={styles['packages-container-wrapper']}>
      <h2 className={styles['packages-section-title']}>{t('packages_section_title', 'The Most Popular Packages')}</h2>

      <motion.div
        className={styles['packages-grid']}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {packagesData.map((pkg) => (
          <motion.div
            key={pkg.key}
            className={styles['package-card']}
            variants={cardItemVariants}
            whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles['package-image-wrapper']}>
              <img src={pkg.image} alt={t(pkg.titleKey)} className={styles['package-image']} />
            </div>

            <div className={styles['package-content']}>
              <h3 className={styles['package-title']}>{t(pkg.titleKey)}</h3>
              <div className={styles['package-price']}>
                <span className={styles['price-value']}>€{pkg.price}</span>
                <span className={styles['price-unit']}>{t('per_unit_day', pkg.unit)}</span>
              </div>

              <ul className={styles['package-features-list']}>
                {pkg.features.map((feature, index) => (
                  <li key={index} className={styles['feature-item']}>
                    <feature.icon className={styles['feature-icon']} />
                    {t(feature.textKey)}
                  </li>
                ))}
              </ul>

              <button className={styles['book-button']}>
                {t('book_now_button', 'Book Now')}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PopularPackages;