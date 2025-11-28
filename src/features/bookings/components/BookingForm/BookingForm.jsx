import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { validateTravelerForm, validateName, validatePhone, validateEmail } from '../../../../lib/validation';
import styles from './BookingForm.module.css';

function BookingForm({ data, onNext, onBack }) {
  const { t } = useTranslation('booking');
  
  const [formData, setFormData] = useState({
    name: data.traveler?.name || '',
    surname: data.traveler?.surname || '',
    phone: data.traveler?.phone || '',
    email: data.traveler?.email || '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time validation on blur
  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    let result;
    switch (field) {
      case 'name':
        result = validateName(formData.name, t('firstName', 'First name'));
        break;
      case 'surname':
        result = validateName(formData.surname, t('lastName', 'Last name'));
        break;
      case 'phone':
        result = validatePhone(formData.phone);
        break;
      case 'email':
        result = validateEmail(formData.email);
        break;
      default:
        return;
    }

    setErrors(prev => ({
      ...prev,
      [field]: result.isValid ? null : result.error
    }));
  }, [formData, t]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    setTouched({ name: true, surname: true, phone: true, email: true });
    
    // Validate entire form
    const validation = validateTravelerForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      
      // Focus first error field
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) element.focus();
      return;
    }

    // Simulate processing delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onNext({ traveler: formData });
    setIsSubmitting(false);
  };

  const getInputClassName = (field) => {
    let className = styles.input;
    if (touched[field]) {
      if (errors[field]) {
        className += ` ${styles.inputError}`;
      } else if (formData[field]?.trim()) {
        className += ` ${styles.inputSuccess}`;
      }
    }
    return className;
  };

  const canProceed =
    formData.name.trim() &&
    formData.surname.trim() &&
    formData.phone.trim() &&
    formData.email.trim() &&
    Object.values(errors).every(e => !e);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('travelerTitle', 'Who shall we send these tickets to?')}</h2>

      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              {t('firstName', 'First Name')} <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="name"
                placeholder={t('firstNamePlaceholder', 'Enter your first name')}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className={getInputClassName('name')}
                autoComplete="given-name"
                maxLength={50}
              />
              {touched.name && !errors.name && formData.name.trim() && (
                <CheckCircle size={18} className={styles.successIcon} />
              )}
            </div>
            {touched.name && errors.name && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.name}</span>
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              {t('lastName', 'Last Name')} <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="surname"
                placeholder={t('lastNamePlaceholder', 'Enter your last name')}
                value={formData.surname}
                onChange={(e) => handleChange('surname', e.target.value)}
                onBlur={() => handleBlur('surname')}
                className={getInputClassName('surname')}
                autoComplete="family-name"
                maxLength={50}
              />
              {touched.surname && !errors.surname && formData.surname.trim() && (
                <CheckCircle size={18} className={styles.successIcon} />
              )}
            </div>
            {touched.surname && errors.surname && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.surname}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              {t('phone', 'Phone Number')} <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                name="phone"
                placeholder={t('phonePlaceholder', '+1 (555) 123-4567')}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                className={getInputClassName('phone')}
                autoComplete="tel"
                maxLength={20}
              />
              {touched.phone && !errors.phone && formData.phone.trim() && (
                <CheckCircle size={18} className={styles.successIcon} />
              )}
            </div>
            {touched.phone && errors.phone && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.phone}</span>
              </div>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              {t('email', 'Email Address')} <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                placeholder={t('emailPlaceholder', 'your@email.com')}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={getInputClassName('email')}
                autoComplete="email"
                maxLength={254}
              />
              {touched.email && !errors.email && formData.email.trim() && (
                <CheckCircle size={18} className={styles.successIcon} />
              )}
            </div>
            {touched.email && errors.email && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttons}>
          <button 
            className={styles.backButton} 
            onClick={onBack}
            type="button"
            disabled={isSubmitting}
          >
            {t('back', 'Back')}
          </button>
          <button 
            className={styles.nextButton} 
            onClick={handleNext}
            disabled={!canProceed || isSubmitting}
            type="button"
          >
            {isSubmitting ? t('processing', 'Processing...') : t('continueToPayment', 'Continue to Payment')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
