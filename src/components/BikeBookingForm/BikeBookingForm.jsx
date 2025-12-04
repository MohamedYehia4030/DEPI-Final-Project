import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import styles from './BikeBookingForm.module.css';
import { motion } from 'framer-motion';
import bikeImage from '../../assets/images/Common/bike.png'; 
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import { FiChevronDown } from 'react-icons/fi';
import useServiceBookingStore from '../../store/booking/useServiceBookingStore';
import { validateName, validateEmail, validatePhone } from '../../lib/validation';

const BikeBookingForm = ({ serviceSlug = 'bike-rickshaw', serviceTitleKey = 'packages:services.bike.title', serviceDescKey = 'packages:services.bike.desc', serviceImg = null }) => {
  const { t } = useTranslation('bikeBooking');
  const navigate = useNavigate();
  
  const setService = useServiceBookingStore(state => state.setService);
  const prefillFromForm = useServiceBookingStore(state => state.prefillFromForm);
  const resetBooking = useServiceBookingStore(state => state.resetBooking);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const dropdownRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    const nameResult = validateName(formData.name, t('form.name', 'Name'));
    if (!nameResult.isValid) {
      newErrors.name = nameResult.error;
    }
    
    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
      newErrors.email = emailResult.error;
    }
    
    const phoneResult = validatePhone(formData.phone);
    if (!phoneResult.isValid) {
      newErrors.phone = phoneResult.error;
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = t('validation.serviceRequired', 'Please select a service type');
    }
    
    if (!selectedDate) {
      newErrors.date = t('validation.dateRequired', 'Please select a date');
    }
    
    if (!selectedTime) {
      newErrors.time = t('validation.timeRequired', 'Please select a time');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (value) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
    setDropdownOpen(false);
    if (errors.serviceType) {
      setErrors(prev => ({ ...prev, serviceType: '' }));
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    resetBooking();
    
    setService({
      slug: serviceSlug,
      titleKey: serviceTitleKey,
      descKey: serviceDescKey,
      img: serviceImg || bikeImage
    });
    
    const formattedDate = selectedDate instanceof Date 
      ? selectedDate.toISOString().split('T')[0] 
      : selectedDate;
    const formattedTime = selectedTime instanceof Date 
      ? selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      : selectedTime;
    
    prefillFromForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType: formData.serviceType,
      date: formattedDate,
      time: formattedTime
    });
    
    navigate("/service-booking");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceTypes = [
    { value: 'city', label: t('bikeTypes.city') },
    { value: 'mountain', label: t('bikeTypes.mountain') },
    { value: 'electric', label: t('bikeTypes.electric') },
    { value: 'road', label: t('bikeTypes.road') },
  ];

  const selectedService = serviceTypes.find(s => s.value === formData.serviceType);

  return (
    <section className={styles.bookingSection}>
      <h2 className={styles.sectionTitle}>{t('form.bookNowBike', 'Book Now Bike')}</h2>
      
      <div className={styles.contentWrapper}>
        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.formBox}>
            <form onSubmit={handleBooking}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder={t('form.namePlaceholder', 'Enter your name and surname')}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder={t('form.emailPlaceholder', 'Enter your email address')}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('form.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder={t('form.phonePlaceholder', 'Enter your telephone number')}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('form.service')}</label>
                  <div className={styles.customDropdown} ref={dropdownRef}>
                    <button
                      type="button"
                      className={`${styles.dropdownTrigger} ${formData.serviceType ? styles.hasValue : ''} ${errors.serviceType ? styles.inputError : ''}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>
                        {selectedService ? selectedService.label : t('form.selectService', 'Select the service types')}
                      </span>
                      <FiChevronDown className={`${styles.dropdownIcon} ${dropdownOpen ? styles.open : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <ul className={styles.dropdownMenu}>
                        {serviceTypes.map(option => (
                          <li
                            key={option.value}
                            className={`${styles.dropdownItem} ${formData.serviceType === option.value ? styles.selected : ''}`}
                            onClick={() => handleServiceSelect(option.value)}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {errors.serviceType && <span className={styles.errorText}>{errors.serviceType}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('form.date', 'Date')}</label>
                  <DateTimePicker
                    mode="date"
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
                    }}
                    placeholder={t('form.datePlaceholder', 'Select the date')}
                    minDate={new Date()}
                    hasError={!!errors.date}
                  />
                  {errors.date && <span className={styles.errorText}>{errors.date}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('form.time', 'Time')}</label>
                  <DateTimePicker
                    mode="time"
                    selected={selectedTime}
                    onChange={(time) => {
                      setSelectedTime(time);
                      if (errors.time) setErrors(prev => ({ ...prev, time: '' }));
                    }}
                    placeholder={t('form.timePlaceholder', 'Select the time')}
                    timeIntervals={30}
                    hasError={!!errors.time}
                  />
                  {errors.time && <span className={styles.errorText}>{errors.time}</span>}
                </div>
              </div>

              <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton}>
                  {t('form.button')}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={bikeImage}
            alt="Mountain Bike"
            className={styles.bikeImage}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default BikeBookingForm;
