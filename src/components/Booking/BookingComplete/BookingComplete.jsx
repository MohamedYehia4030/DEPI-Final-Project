import { Check } from 'lucide-react';
import styles from './BookingComplete.module.css';

function BookingComplete({ bookingDetails }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
   

      <div className={styles.content}>
        <div className={styles.successIcon}>
          <div className={styles.iconCircle}>
            <Check size={48} strokeWidth={3} />
          </div>
        </div>

        <h1 className={styles.title}>Your Order is Complete!</h1>
        <p className={styles.message}>
          You will be receiving a confirmation email with order details.
        </p>

        {bookingDetails && (
          <div className={styles.bookingDetails}>
            <h3>Booking Summary</h3>
            <p><strong>Reference Number:</strong> {bookingDetails.refNumber}</p>
            <p><strong>Date:</strong> {bookingDetails.date}</p>
            <p><strong>Total:</strong> €{bookingDetails.total}</p>
          </div>
        )}

        <button className={styles.homeButton} onClick={handleGoHome}>
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

export default BookingComplete;