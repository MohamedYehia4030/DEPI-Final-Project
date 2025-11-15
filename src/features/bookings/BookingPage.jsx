import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './BookingPage.module.css';
import BookingForm from './BookingForm';
import BookingPayment from './BookingPayment';
import BookingComplete from './BookingComplete';
import BookingSummary from './BookingSummary';

const BookingPage = () => {
  const { t } = useTranslation('booking');
  const [step, setStep] = useState(1);

  return (
    <div className={styles.bookingPage}>
      <BookingSummary />
      <div className={styles.formContainer}>
        {step === 1 && <BookingForm onNext={() => setStep(2)} />}
        {step === 2 && <BookingPayment onNext={() => setStep(3)} />}
        {step === 3 && <BookingComplete />}
      </div>
    </div>
  );
};

export default BookingPage;