import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import styles from './BikeBookingForm.module.css';
import { motion } from 'framer-motion'; // 1. Import motion
import bikeImage from '../../assets/images/Common/bike.png'; 

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
            <div className={styles.formBox}>
              <h3 className="fw-bold mb-4">{t('bikeBooking.title')}</h3>
              <Form className="row g-3">
                <Col md={6}>
                  <Form.Control type="text" placeholder={t('bikeBooking.form.name')} />
                </Col>
                <Col md={6}>
                  <Form.Control type="email" placeholder={t('bikeBooking.form.email')} />
                </Col>
                <Col md={6}>
                  <Form.Control type="tel" placeholder={t('bikeBooking.form.phone')} />
                </Col>
                <Col md={6}>
                  <Form.Control type="text" placeholder={t('bikeBooking.form.service')} />
                </Col>
                <Col md={12}>
                  <Form.Control type="date" />
                </Col>
                <Col md={12}>
                  <Button type="submit" className={styles.submitBtn}>
                    {t('bikeBooking.form.button')}
                  </Button>
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