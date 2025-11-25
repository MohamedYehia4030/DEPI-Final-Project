import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './PopularTransport.module.css';

import traimg1 from '../../../assets/images/Home/transport-img1.png';
import traimg2 from '../../../assets/images/Home/transport-img2.png';
import traimg3 from '../../../assets/images/Home/transport-img3.png';
import traimg4 from '../../../assets/images/Home/transport-img4.png';

const serviceData = [
  {
    key: 'bike_rental',
    titleKey: 'service1_title',
    descriptionKey: 'service1_description',
    image: traimg1,
  },
  {
    key: 'guided_tour',
    titleKey: 'service2_title',
    descriptionKey: 'service2_description',
    image: traimg2,
  },
  {
    key: 'taxi_ncc',
    titleKey: 'service3_title',
    descriptionKey: 'service3_description',
    image: traimg3,
  },
  {
    key: 'bus_package',
    titleKey: 'service4_title',
    descriptionKey: 'service4_description',
    image: traimg4,
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const PopularTransport = () => {
  const { t } = useTranslation('home');

  return (
    <motion.div
      className={styles['services-section-container']}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className={styles['services-grid']}
        variants={containerVariants}
      >
        {serviceData.map((service) => (
          <motion.div
            key={service.key}
            className={styles['service-card']}
            variants={cardItemVariants}
            whileHover={{ y: -7, boxShadow: "0 12px 20px rgba(0,0,0,0.2)" }}
          >
            <div className={styles['service-image-wrapper']}>
              <img src={service.image} alt={t(service.titleKey)} className={styles['service-image']} />
            </div>

            <div className={styles['service-content']}>
              <h3 className={styles['service-title']}>{t(service.titleKey)}</h3>
              <p className={styles['service-description']}>{t(service.descriptionKey)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PopularTransport;