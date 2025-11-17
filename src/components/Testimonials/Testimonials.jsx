import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Testimonials.module.css';

const Testimonials = ({ title }) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.testimonials}>
      <div className="container py-5">
        <h2 className="fw-bold mb-4 text-center">{title}</h2>
        <div className="text-center text-muted">
          <p>Your review slider will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;