import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from './BikeBookingForm.module.css';
import { motion } from 'framer-motion';
import bikeImage from '../../assets/images/Common/bike.png'; 
import Button from '../Button/Button'; 
import DateTimePicker from '../DateTimePicker/DateTimePicker';

const BikeBookingForm = () => {
  const { t } = useTranslation('bikeBooking');
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBooking = () => {
    navigate("/booking");
  };

  return (
    <section className={styles.bookingSection}>
      <Container>
        <Row className="align-items-center g-5">
          <Col 
            as={motion.div} 
            md={6}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className='title'>
              <h3 className="fw-bold mb-4 text-center">{t('title')}</h3>
            </div>

            <div className={styles.formBox}>
              <Form className="row g-3">
                <Col md={6}>
                  <label>{t('form.name')}</label>
                  <Form.Control type="text" placeholder={t('form.name')} />
                </Col>

                <Col md={6}>
                  <label>{t('form.email')}</label>
                  <Form.Control type="email" placeholder={t('form.email')} />
                </Col>

                <Col md={6}>
                  <label>{t('form.phone')}</label>
                  <Form.Control type="tel" placeholder={t('form.phone')} />
                </Col>

                <Col md={6}>
                  <label>{t('form.service')}</label>
                  <Form.Control type="text" placeholder={t('form.service')} />
                </Col>

                <Col md={6}>
                  <label>{t('form.pickupDate')}</label>
                  <DateTimePicker
                    mode="date"
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    placeholder={t('form.pickupDate')}
                    minDate={new Date()}
                  />
                </Col>

                <Col md={6}>
                  <label>{t('form.pickupTime', 'Time')}</label>
                  <DateTimePicker
                    mode="time"
                    selected={selectedTime}
                    onChange={setSelectedTime}
                    placeholder={t('form.pickupTime', 'Time')}
                    timeIntervals={30}
                  />
                </Col>

                <Col md={12}>
                  <Button size="book" onClick={handleBooking}>
                    {t('form.button')}
                  </Button>
                </Col>
              </Form>
            </div>
          </Col>

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
