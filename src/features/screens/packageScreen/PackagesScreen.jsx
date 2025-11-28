import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row } from 'react-bootstrap';

import { tours, services } from '../../packages/api/data.js';

import './PackageScreen.module.css';

import PackageCard from '../../packages/components/PackageCard/PackageCard.jsx';
import PackageServices from '../../packages/components/PackageServices/PackageServices.jsx';

// Shared components
import BikeBookingForm from '../../../components/BikeBookingForm/BikeBookingForm.jsx';

const PackagesPage = () => {
  const { t } = useTranslation(['packages', 'common', 'home']);

  return (
    <div>
      {/* Tours List */}
      <Container style={{marginTop:"90px"}} className="py-5" >
        <h2 className="fw-bold mb-4">{t('packages:pageTitle')}</h2>

        <Row className="g-4">
          {tours.map((tour, index) => (
            <PackageCard key={tour.id} tour={tour} index={index} />
          ))}
        </Row>
      </Container>

      {/* Services Section */}
      <PackageServices services={services} />

      {/* Booking Form */}
      <BikeBookingForm />


    </div>
  );
};

export default PackagesPage;
