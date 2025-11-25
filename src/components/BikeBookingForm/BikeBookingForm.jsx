import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import styles from './BikeBookingForm.module.css';
import { motion } from 'framer-motion'; 
import bikeImage from '../../assets/images/Common/bike.png'; 
import Button from '../Button/Button'; 

const BikeBookingForm = () => {
  const { t } = useTranslation('bikeBooking');

  return (
    <section className={styles.bookingSection}>
      <Container>
        <Row className="align-items-center g-5">
          {/* 2. Animate the Form Column */}
          <Col 
            as={motion.div} 
            md={6}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className='title'>
            <h3 className="fw-bold mb-4 text-center">{t('Book Now Bike')}</h3>
            </div>
            <div className={styles.formBox}>
              
              <Form className="row g-3">
                <Col md={6}>
                  <label>Name and Surname</label>
                  <Form.Control type="text" placeholder={t('Enter your name and surname')} />
                </Col>
                <Col md={6}>
                  <label>Email Address</label>
                  <Form.Control type="email" placeholder={t('Enter your email address')} />
                </Col>
                <Col md={6}>
                  <label>Telephone Number</label>
                  <Form.Control type="tel" placeholder={t('Enter your telephone number')} />
                </Col>
                <Col md={6}>
                  <label>Service Type</label>
                  <Form.Control type="text" placeholder={t('select the service type')} />
                </Col>
                <Col md={6}>
                  <label>Date</label>
                  <Form.Control type="date" placeholder={t('select the date')} />
                </Col>
                <Col md={6}>
                  <label>Time</label>
                  <Form.Control type="time" placeholder={t('select the time')} />
                </Col>
                <Col md={12}>
                 <Button size="book">Book Now</Button>
                </Col>
              </Form>
            </div>
          </Col>
          
          {/* 3. Animate the Image Column */}
          <Col 
            as={motion.div} 
            md={6} 
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={bikeImage}
              alt="bike"
              className={styles.bikeImage}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BikeBookingForm;