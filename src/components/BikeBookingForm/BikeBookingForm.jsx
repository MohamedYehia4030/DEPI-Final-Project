import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from './BikeBookingForm.module.css';
import { motion } from 'framer-motion';
import bikeImage from '../../assets/images/Common/bike.png'; 
import Button from '../Button/Button'; 

const BikeBookingForm = () => {
  const { t } = useTranslation('bikeBooking');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrors({...errors, [e.target.name]: ''});
  };

  const validate = () => {
    const newErrors = {};

    // Name validation: letters only
    if (!formData.name) {
      newErrors.name = t('Please enter your name');
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = t('Name should contain letters only');
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = t('Please enter your email');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('Please enter a valid email');
    }

    // Phone validation: numbers only
    if (!formData.phone) {
      newErrors.phone = t('Please enter your phone number');
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = t('Phone number should contain digits only');
    }

    // Service
    if (!formData.service) newErrors.service = t('Please select a service type');

    // Date
    if (!formData.date) newErrors.date = t('Please select a date');

    // Time
    if (!formData.time) newErrors.time = t('Please select a time');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/booking");
    }
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
              <h3 className="fw-bold mb-4 text-center">{t('Book Now Bike')}</h3>
            </div>

            <div className={styles.formBox}>
              <Form className="row g-3" onSubmit={handleBooking}>
                <Col md={6}>
                  <Form.Label>{t('Name and Surname')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    placeholder={t('Enter your name and surname')} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Col>

                <Col md={6}>
                  <Form.Label>{t('Email Address')}</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder={t('Enter your email address')} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Col>

                <Col md={6}>
                  <Form.Label>{t('Telephone Number')}</Form.Label>
                  <Form.Control 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    placeholder={t('Enter your telephone number')} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Col>

                <Col md={6}>
                  <Form.Label>{t('Service Type')}</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    isInvalid={!!errors.service}
                    placeholder={t('Select the service type')} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.service}</Form.Control.Feedback>
                </Col>

                <Col md={6}>
                  <Form.Label>{t('Date')}</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    isInvalid={!!errors.date}
                  />
                  <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </Col>

                <Col md={6}>
                  <Form.Label>{t('Time')}</Form.Label>
                  <Form.Control 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    isInvalid={!!errors.time}
                  />
                  <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
                </Col>

                <Col md={12}>
                  <Button size="book" type="submit">
                    {t('Book Now')}
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
