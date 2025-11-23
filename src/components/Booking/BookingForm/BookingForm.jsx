import { useState } from 'react';
import styles from './BookingForm.module.css';

function BookingForm({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    name: data.traveler?.name || '',
    surname: data.traveler?.surname || '',
    phone: data.traveler?.phone || '',
    email: data.traveler?.email || '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    onNext({ traveler: formData });
  };

  const canProceed =
    formData.name.trim() &&
    formData.surname.trim() &&
    formData.phone.trim() &&
    formData.email.trim();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Who shall we send these tickets to?</h2>

      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Surname</label>
            <input
              type="text"
              placeholder="Enter your surname"
              value={formData.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Telephone Number</label>
            <input
              type="tel"
              placeholder="Enter your telephone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.backButton} onClick={onBack}>
            Back
          </button>
          <button 
            className={styles.nextButton} 
            onClick={handleNext}
            disabled={!canProceed}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;