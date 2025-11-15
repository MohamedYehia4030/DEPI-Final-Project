import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'react-bootstrap';
import styles from './PackagesPage.module.css';
import { tours, services } from './data.js';
import PackageCard from './PackageCard';
import PackageServices from './PackageServices';
import BikeBookingForm from '../shared/components/BikeBookingForm/BikeBookingForm.jsx';
import Testimonials from '../shared/components/Testimonials/Testimonials.jsx';

const PackagesPage = () => {
  const { t } = useTranslation(['packages', 'common', 'home']); 

  return (
    <div className={styles.packagesPage}>
      <Container className="py-5">
        <h2 className="fw-bold mb-4">{t('packages:pageTitle')}</h2>
        <Row className="g-4">
          {tours.map((tour, index) => (
            <PackageCard key={tour.id} tour={tour} index={index} />
          ))}
        </Row>
      </Container>

      <PackageServices services={services} />
      <BikeBookingForm />
      <Testimonials title={t('home:testimonials.title')} />
    </div>
  );
};

export default PackagesPage;