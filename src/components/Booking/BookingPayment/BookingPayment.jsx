import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import styles from './BookingPayment.module.css';

function BookingPayment({ data, onNext, onBack }) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (field, value) => {
    setPaymentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const canProceed =
    paymentData.cardNumber.trim() &&
    paymentData.cardHolder.trim() &&
    paymentData.expiryDate.trim() &&
    paymentData.cvv.trim();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Payment Information</h2>
        <div className={styles.secure}>
          <Lock size={16} />
          <span>Secure Payment</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Card Number</label>
          <div className={styles.inputWrapper}>
            <CreditCard size={20} className={styles.icon} />
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) => handleChange('cardNumber', e.target.value)}
              className={styles.input}
              maxLength={19}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Card Holder Name</label>
          <input
            type="text"
            placeholder="Enter card holder name"
            value={paymentData.cardHolder}
            onChange={(e) => handleChange('cardHolder', e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className={styles.input}
              maxLength={5}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>CVV</label>
            <input
              type="text"
              placeholder="123"
              value={paymentData.cvv}
              onChange={(e) => handleChange('cvv', e.target.value)}
              className={styles.input}
              maxLength={4}
            />
          </div>
        </div>

        <div className={styles.info}>
          <Lock size={16} />
          <p>Your payment information is encrypted and secure. We do not store your card details.</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.backButton} onClick={onBack} type="button">
            Back
          </button>
          <button 
            className={styles.nextButton} 
            type="submit"
            disabled={!canProceed}
          >
            Complete Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingPayment;