import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Card } from 'react-bootstrap';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './PackageCard.module.css';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger animations for visual appeal
      duration: 0.5
    }
  })
};

const truncateWords = (text, limit) => {
  const words = text.split(" ");
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "...";
};

const PackageCard = ({ tour, index }) => {
  const { t, i18n } = useTranslation(['packages', 'common']);
  const tourUrl = `/packages/${tour.id}`;
  // Arrow direction changes based on language (RTL for Arabic)
  const arrow = i18n.dir() === 'rtl' ? '←' : '→';
//  const tourUrl = `/packages/${tour.id}`;
  return (
    <Col 
      as={motion.div}
      lg={3} 
      md={4} 
      sm={6} 
      xs={12} 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={index}
    >
      <div className={styles.packageCard}>
        <div>
        <img
          variant="top"
          src={tour.img}
          alt={t(tour.titleKey)}
          className={styles.cardImage}
        />
        </div>
        <div className={styles.cardBody}>
          <h2 className={styles.cardTitle}>{t(tour.titleKey)}</h2>
          <p >
            {t('packages:priceFrom')} <span className={styles.cardPrice}>{tour.price}</span>
          </p>

          <div className={styles.iconRow}>
            <span className={styles.iconItem}><FiClock /> {tour.duration}</span>
            <span className={styles.iconItem}><FiUsers /> {t(tour.groupKey)}</span>
            {/* <span className={styles.iconItem}><FiStar /> {tour.rating}</span> */}
          </div>

          <p>{truncateWords(tour.desc, 12)}</p>

          <Link to={tourUrl} className={styles.readMore}>
            {t('common:readMore')} {arrow}
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default PackageCard;