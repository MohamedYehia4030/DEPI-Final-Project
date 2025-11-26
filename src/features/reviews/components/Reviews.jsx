import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from '../../../components/Slider/Slider';
import styles from './Reviews.module.css';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import person1 from '../../../assets/reviews/Person 1.png';
import person2 from '../../../assets/reviews/Person 2.jpg';
import person3 from '../../../assets/reviews/person 3.jpg';
import person4 from '../../../assets/reviews/Person 4.avif';
import person5 from '../../../assets/reviews/person5.jpg';
import mockReviews from '../api/mockReviews';

const avatars = [person1, person2, person3, person4, person5];

export default function Reviews() {
  const { t } = useTranslation('Reviews');

  // Build translated review nodes and pass them as children to the Slider wrapper
  const reviewNodes = useMemo(() => {
    return mockReviews.map((m, idx) => {
      const review = { name: t(m.nameKey), comment: t(m.commentKey) };
      return (
        <motion.div
          key={idx}
          className={styles.reviewCard}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className={styles.reviewHeader}>
            <motion.img
              src={avatars[idx % avatars.length]}
              alt={review.name}
              className={styles.avatar}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            />
            <div className={styles.reviewerInfo}>
              <h3>{review.name}</h3>
            </div>
          </div>

          <div className={styles.quoteContainer}>
            <span className={`${styles.quoteIcon} ${styles.quoteTopLeft}`}>“</span>
            <p className={styles.comment}>{review.comment}</p>
            <span className={`${styles.quoteIcon} ${styles.quoteBottomRight}`}>”</span>
          </div>
        </motion.div>
      );
    });
  }, [t]);

  return <Slider perSlide={3} maxWidth={"1500px"}>{reviewNodes}</Slider>;
}
