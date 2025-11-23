import { Check } from 'lucide-react';
import styles from './BookingComplete.module.css';

function BookingComplete({ bookingDetails }) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#1a5f7a" />
            <path d="M20 10 L25 15 L20 20 L25 25 L20 30 L15 25 L20 20 L15 15 Z" fill="white" />
          </svg>
          <span className={styles.logoText}>Voyago</span>
        </div>

        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/packages">Tour Packages</a>
          <a href="/contact">Contact Us</a>
        </nav>

        <div className={styles.headerActions}>
          <select className={styles.langSelect}>
            <option>English</option>
          </select>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </div>

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