import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import styles from './ServiceBookingForm.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import { FiChevronDown } from 'react-icons/fi';
import useServiceBookingStore from '../../store/booking/useServiceBookingStore';
import { getServices } from '../../features/packages/api/packagesAPI';
import { getImageUrl, handleImageError, PLACEHOLDER_SERVICE } from '../../lib/imageUtils';
import { validateName, validateEmail, validatePhone } from '../../lib/validation';

const defaultPlaceholder = PLACEHOLDER_SERVICE;

const ServiceBookingForm = ({ initialServiceType = '' }) => {
  const { t } = useTranslation(['bikeBooking', 'packages', 'common']);
  const navigate = useNavigate();
  
  const setService = useServiceBookingStore(state => state.setService);
  const prefillFromForm = useServiceBookingStore(state => state.prefillFromForm);
  const resetBooking = useServiceBookingStore(state => state.resetBooking);
  
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: initialServiceType,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(defaultPlaceholder);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await getServices();
        setServices(data);
        
        if (initialServiceType) {
          const initialService = data.find(s => s._id === initialServiceType || s.titleKey === initialServiceType);
          if (initialService?.img) {
            setCurrentImage(getImageUrl(initialService.img, 'service'));
          }
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchServices();
  }, [initialServiceType]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.serviceType) {
      newErrors.serviceType = t('bikeBooking:validation.serviceRequired', 'Please select a service');
    }
    
    const nameResult = validateName(formData.name, t('bikeBooking:form.name', 'Name'));
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
    
    if (!selectedDate) {
      newErrors.date = t('bikeBooking:validation.dateRequired', 'Please select a date');
    }
    
    if (!selectedTime) {
      newErrors.time = t('bikeBooking:validation.timeRequired', 'Please select a time');
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

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({ ...prev, serviceType: serviceId }));
    setDropdownOpen(false);
    setErrors(prev => ({ ...prev, serviceType: '' }));
    
    const selectedSvc = services.find(s => s._id === serviceId);
    if (selectedSvc?.img) {
      setCurrentImage(getImageUrl(selectedSvc.img, 'service'));
    } else {
      setCurrentImage(defaultPlaceholder);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (errors.date) {
      setErrors(prev => ({ ...prev, date: '' }));
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (errors.time) {
      setErrors(prev => ({ ...prev, time: '' }));
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    setTouched({
      serviceType: true,
      name: true,
      email: true,
      phone: true,
      date: true,
      time: true,
    });
    
    if (!validateForm()) {
      return;
    }
    
    resetBooking();
    
    const selectedServiceData = services.find(s => s._id === formData.serviceType);
    
    setService({
      id: selectedServiceData?._id,
      slug: formData.serviceType,
      titleKey: selectedServiceData?.titleKey || '',
      descKey: selectedServiceData?.descKey || '',
      img: getImageUrl(selectedServiceData?.img, 'service') || defaultPlaceholder
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

  const selectedService = services.find(s => s._id === formData.serviceType);
  
  const getServiceLabel = (service) => {
    if (!service) return '';
    const translated = t(service.titleKey);
    return translated !== service.titleKey ? translated : service.titleKey;
  };

  return (
    <section className={styles.bookingSection}>
      <h2 className={styles.sectionTitle}>{t('bikeBooking:title', 'Book Our Services')}</h2>
      <p className={styles.sectionSubtitle}>{t('bikeBooking:subtitle', 'Choose from our premium selection of services for your adventure')}</p>
      
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
                {/* Service Type Dropdown - First */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>{t('bikeBooking:form.service')}</label>
                  <div className={styles.customDropdown} ref={dropdownRef}>
                    <button
                      type="button"
                      className={`${styles.dropdownTrigger} ${formData.serviceType ? styles.hasValue : ''} ${errors.serviceType && touched.serviceType ? styles.inputError : ''}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      disabled={loadingServices}
                    >
                      <span>
                        {loadingServices 
                          ? t('common:loading', 'Loading...') 
                          : selectedService 
                            ? getServiceLabel(selectedService) 
                            : t('bikeBooking:form.selectService', 'Select a service')}
                      </span>
                      <FiChevronDown className={`${styles.dropdownIcon} ${dropdownOpen ? styles.open : ''}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.ul 
                          className={styles.dropdownMenu}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {services.map(service => (
                            <li
                              key={service._id}
                              className={`${styles.dropdownItem} ${formData.serviceType === service._id ? styles.selected : ''}`}
                              onClick={() => handleServiceSelect(service._id)}
                            >
                              {service.img && (
                                <img 
                                  src={service.img} 
                                  alt="" 
                                  className={styles.dropdownItemImg}
                                  onError={(e) => e.target.style.display = 'none'}
                                />
                              )}
                              <span>{getServiceLabel(service)}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.serviceType && touched.serviceType && (
                    <span className={styles.errorMessage}>{errors.serviceType}</span>
                  )}
                </div>

                {/* Name Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('bikeBooking:form.name')}</label>
                  <input
                    type="text"
                    name="name"
                    className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                    placeholder={t('bikeBooking:form.namePlaceholder', 'Enter your name and surname')}
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                  />
                  {errors.name && touched.name && (
                    <span className={styles.errorMessage}>{errors.name}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('bikeBooking:form.email')}</label>
                  <input
                    type="email"
                    name="email"
                    className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                    placeholder={t('bikeBooking:form.emailPlaceholder', 'Enter your email address')}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                  />
                  {errors.email && touched.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                  )}
                </div>

                {/* Phone Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('bikeBooking:form.phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ''}`}
                    placeholder={t('bikeBooking:form.phonePlaceholder', 'Enter your telephone number')}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                  />
                  {errors.phone && touched.phone && (
                    <span className={styles.errorMessage}>{errors.phone}</span>
                  )}
                </div>

                {/* Date Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('bikeBooking:form.date', 'Date')}</label>
                  <DateTimePicker
                    mode="date"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    placeholder={t('bikeBooking:form.datePlaceholder', 'Select the date')}
                    minDate={new Date()}
                    className={errors.date && touched.date ? styles.inputError : ''}
                  />
                  {errors.date && touched.date && (
                    <span className={styles.errorMessage}>{errors.date}</span>
                  )}
                </div>

                {/* Time Field */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t('bikeBooking:form.time', 'Time')}</label>
                  <DateTimePicker
                    mode="time"
                    selected={selectedTime}
                    onChange={handleTimeChange}
                    placeholder={t('bikeBooking:form.timePlaceholder', 'Select the time')}
                    timeIntervals={30}
                    className={errors.time && touched.time ? styles.inputError : ''}
                  />
                  {errors.time && touched.time && (
                    <span className={styles.errorMessage}>{errors.time}</span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className={styles.buttonWrapper}>
                <button type="submit" className={styles.submitButton}>
                  {t('bikeBooking:form.button')}
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
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={selectedService ? getServiceLabel(selectedService) : 'Service'}
              className={styles.serviceImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onError={(e) => handleImageError(e, 'service')}
            />
          </AnimatePresence>
          <div className={styles.imageOverlay}>
            <span className={styles.serviceLabel}>
              {selectedService ? getServiceLabel(selectedService) : t('bikeBooking:form.selectService', 'Select a service')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceBookingForm;
