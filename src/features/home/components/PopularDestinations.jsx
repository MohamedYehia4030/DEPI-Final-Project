import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './PopularDestinations.module.css';
import Slider from '../../../components/Slider/Slider'; // Assuming this component exists
import cardImage1 from '../../../assets/images/Home/Card-Image-1.jpg';
import cardImage2 from '../../../assets/images/Home/Card-Image-2.png';
import cardImage3 from '../../../assets/images/Home/Card-Image-3.png';
import cardImage4 from '../../../assets/images/Home/Card-Image-4.png';
import cardImage5 from '../../../assets/images/Home/Card-Image-5.png';
import cardImage6 from '../../../assets/images/Home/Card-Image-6.png';
import cardImage7 from '../../../assets/images/Home/Card-Image-7.png';
import cardImage8 from '../../../assets/images/Home/Card-Image-8.png';
import cardImage9 from '../../../assets/images/Home/Card-Image-9.jpg';
import welcomeImage from '../../../assets/images/Home/welcome-picture.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 }
  }
};

const cardItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const PopularDestinations = () => {
  const { t } = useTranslation('home');

  const toursData = [
    { key: "tour1", title: "Lucca Bike Tour", price: "34 €", image: cardImage1, details: "A tour of the city and its surroundings led by a professional guide ...", schedule: "EVERY_DAY", duration: "3-10 PP" },
    { key: "tour2", title: "Wine tasting In Tuscany", price: "34 €", image: cardImage2, details: "The real magic is here where you can enjoy the best Tuscan wine and eat ...", schedule: "MONDAY", duration: "10-30 PP" },
    { key: "tour3", title: "Cinque Terre Tour", price: "34 €", image: cardImage3, details: "Visiting the 5 Terre is a must, and you can never go there enough ...", schedule: "TBD", duration: "10-50 PP" },
    { key: "tour4", title: "Siena and Surroundings", price: "34 €", image: cardImage4, details: "Visit the beautiful Siena and the cities that surround it to experience ...", schedule: "TBD", duration: "5-10 PP" },
    { key: "tour5", title: "Florence Art Walk", price: "45 €", image: cardImage5, details: "Discover the artistic heart of Florence with a guided walking tour.", schedule: "SATURDAY", duration: "5-15 PP" },
    { key: "tour6", title: "Pisa Tower Climb", price: "25 €", image: cardImage6, details: "A thrilling experience to climb the iconic Leaning Tower of Pisa.", schedule: "SUNDAY", duration: "10-20 PP" },
    { key: "tour7", title: "Tuscan Cooking Class", price: "60 €", image: cardImage7, details: "Learn to cook authentic Tuscan dishes from a local chef.", schedule: "FRIDAY", duration: "8-12 PP" },
    { key: "tour8", title: "Venice Gondola Ride", price: "50 €", image: cardImage8, details: "Experience the magic of Venice with a traditional gondola ride.", schedule: "EVERY_DAY", duration: "2-5 PP" },
    { key: "tour9", title: "Rome Colosseum Tour", price: "35 €", image: cardImage9, details: "A journey back in time with a guided tour of the ancient Colosseum.", schedule: "TUESDAY", duration: "15-40 PP" }
  ];

  const getScheduleTranslationKey = (schedule) => {
    switch (schedule) {
      case 'EVERY_DAY': return 'schedule_every_day';
      case 'MONDAY': return 'schedule_monday';
      case 'TUESDAY': return 'schedule_tuesday';
      case 'WEDNESDAY': return 'schedule_wednesday';
      case 'THURSDAY': return 'schedule_thursday';
      case 'FRIDAY': return 'schedule_friday';
      case 'SATURDAY': return 'schedule_saturday';
      case 'SUNDAY': return 'schedule_sunday';
      case 'TBD': return 'schedule_tbd';
      default: return schedule;
    }
  };

  return (
    <motion.div
      className={styles['travel-section-container']}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles['travel-header-row']}>
        <h2 className={styles['travel-section-title']}>{t('popular_destinations_title')}</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Slider
          perSlide={4} // Default desktop view: 4 cards
          // Gap between cards
          // Passing button classes for the Slider to use
          prevButtonClass={styles['travel-nav-button-prev']}
          nextButtonClass={styles['travel-nav-button-next']}
          navButtonClass={styles['travel-nav-button']}
          // Responsive breakpoints for the Slider (Assuming the Slider component supports this format)
          breakpoints={{
            1200: { perSlide: 4 }, // Large screens: 4
            992: { perSlide: 3 },  // Medium screens: 3
            768: { perSlide: 2 },  // Small tablets: 2
            0: { perSlide: 1 }     // Mobile: 1
          }}
        >
          {toursData.map((tour, index) => (
            <motion.div
              key={index}
              className={styles['travel-tour-card']}
              variants={cardItemVariants}
              whileHover={{ y: -5, boxShadow: '0 12px 25px rgba(0,0,0,0.12)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={styles['travel-card-image']}>
                <img src={tour.image} alt={t(`${tour.key}_title`)} />
              </div>
              <div className={styles['travel-card-content']}>
                <h3 className={styles['travel-card-title']}>{t(`${tour.key}_title`)}</h3>
                <p className={styles['travel-card-price']}>{tour.price}</p>

                <div className={styles['travel-tour-meta']}>
                  <span className={styles['travel-meta-item']}>
                    <MdOutlineDateRange className={styles['travel-meta-icon']} />
                    {t(getScheduleTranslationKey(tour.schedule))}
                  </span>
                  <span className={styles['travel-meta-item']}>
                    <FaUsers className={styles['travel-meta-icon']} />
                    {tour.duration}
                  </span>
                </div>

                <p className={styles['travel-card-details']}>{t(`${tour.key}_details`)}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>

      {/* --- Welcome Section (Kept as provided, but styled for RTL compatibility) --- */}
      <motion.div
        className={styles['travel-welcome-section']}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles['travel-welcome-image-area']}>
          <div className={styles['travel-welcome-image-placeholder']}>
            <img src={welcomeImage} alt={t('welcome_image_alt')} />
          </div>
        </div>
        <div className={styles['travel-welcome-content']}>
          <p className={styles['travel-welcome-subtitle']}>{t('welcome_subtitle')}</p>
          <h3 className={styles['travel-welcome-title']}>{t('welcome_title')}</h3>
          <p className={styles['travel-welcome-description']}>{t('welcome_description')}</p>

          <div className={styles['travel-stats-container']}>
            <div className={styles['travel-stat-item']}>
              <p className={styles['travel-stat-number']}>20+</p>
              <p className={styles['travel-stat-label']}>{t('stat1_label')}</p>
            </div>
            <div className={styles['travel-stat-item']}>
              <p className={styles['travel-stat-number']}>100+</p>
              <p className={styles['travel-stat-label']}>{t('stat2_label')}</p>
            </div>
            <div className={styles['travel-stat-item']}>
              <p className={styles['travel-stat-number']}>15+</p>
              <p className={styles['travel-stat-label']}>{t('stat3_label')}</p>
            </div>
            <div className={styles['travel-stat-item']}>
              <p className={styles['travel-stat-number']}>10+</p>
              <p className={styles['travel-stat-label']}>{t('stat4_label')}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PopularDestinations;