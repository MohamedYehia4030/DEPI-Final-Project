import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Testimonials.module.css';
import { ImQuotesRight } from "react-icons/im";
import person1 from '../../../assets/reviews/Person 1.png';
import person2 from '../../../assets/reviews/Person 2.jpg';
import person3 from '../../../assets/reviews/person 3.jpg';
import person4 from '../../../assets/reviews/Person 4.avif';
import person5 from '../../../assets/reviews/person5.jpg';

const Testimonials = () => {
  // Load translations from "Reviews" namespace
  const { t, i18n } = useTranslation('Reviews');
  const title = t("title");

  // Reference to the Swiper instance
  const swiperRef = useRef(null);

  // Control slider navigation button state
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Get reviews from translation file
  const reviews = t('comments', { returnObjects: true }) || [];
  const reviewsArray = Array.isArray(reviews) ? reviews : [];

  // Detect RTL or LTR direction based on selected language
  const isRTL = i18n.dir() === 'rtl';

  // Update button states when slides change
  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  /**
   * Group reviews into pairs of 2 per slide.
   * Example: [1,2,3,4] → [[1,2], [3,4]]
   */
  const groupedReviews = [];
  for (let i = 0; i < reviewsArray.length; i += 2) {
    groupedReviews.push(reviewsArray.slice(i, i + 2));
  }

  // Handle previous button click
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Local avatar images
  const avatars = [person1, person2, person3,person4,person5];

  return (
    <div className={styles.container}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          {/* Custom Navigation Buttons */}
          <div className={styles.navButtons}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              disabled={isBeginning}
              aria-label={isRTL ? 'Next' : 'Previous'}
            >
              {isRTL ? '→' : '←'}
            </button>

            <button
              className={styles.navButton}
              onClick={handleNext}
              disabled={isEnd}
              aria-label={isRTL ? 'Previous' : 'Next'}
            >
              {isRTL ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* Swiper Component */}
        <Swiper
          key={i18n.language}       // Force re-render when language changes
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className={styles.swiperContainer}
          loop={false}
          dir={i18n.dir()}          // Enable full RTL support
        >
          {/* Render grouped review slides */}
          {groupedReviews.map((reviewGroup, index) => (
            <SwiperSlide key={index}>
              <div className="row">
                {/* Render each review inside its column */}
                {reviewGroup.map((review, idx) => (
                  <div className="col-md-6" key={idx}>
                    <motion.div
                      className={styles.reviewCard}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      {/* Reviewer Header (Photo + Name) */}
                      <div className={styles.reviewHeader}>
                        <motion.img
                          src={avatars[index * 2 + idx]}
                          alt={review.name}
                          className={styles.avatar}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05 }}
                        />
                        <div className={styles.reviewerInfo}>
                          <h3>{review.name}</h3>
                        </div>
                      </div>

                      {/* Review Text with Quotes */}
                      <div className={styles.quoteContainer}>
                        <ImQuotesRight
                          className={`${styles.quoteIcon} ${styles.quoteTopLeft}`}
                        />
                        <p className={styles.comment}>{review.comment}</p>
                        <ImQuotesRight
                          className={`${styles.quoteIcon} ${styles.quoteBottomRight}`}
                        />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;