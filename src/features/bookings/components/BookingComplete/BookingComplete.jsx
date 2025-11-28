import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../../store/auth/useAuthStore';
import useUserTicketsStore from '../../../../store/tickets/useUserTicketsStore';
import useBookingStore from '../../../../store/booking/useBookingStore';
import styles from './BookingComplete.module.css';

function BookingComplete({ bookingDetails, onGoHome }) {
  const { t } = useTranslation('booking');
  const user = useAuthStore((state) => state.user);
  const addTicket = useUserTicketsStore((state) => state.addTicket);
  const { packageInfo, tickets, selectedDate, selectedTime, traveler, calculateTotal, resetBooking } = useBookingStore();
  
  // Ref to prevent double execution in Strict Mode
  const hasAddedTicket = useRef(false);

  // Save ticket when component mounts
  useEffect(() => {
    if (hasAddedTicket.current) return;
    
    if (user && packageInfo && bookingDetails?.refNumber) {
      hasAddedTicket.current = true;
      addTicket({
        refNumber: bookingDetails.refNumber,
        userEmail: user.email,
        userName: user.name,
        tourId: packageInfo.id,
        tourName: packageInfo.name,
        tourImage: packageInfo.image,
        tourPrice: packageInfo.price,
        date: selectedDate,
        time: selectedTime,
        tickets: tickets,
        traveler: traveler,
        total: calculateTotal(),
        paymentMethod: 'card', // or get from payment step
      });
    }
  }, []);
  
  const handleGoHome = () => {
    resetBooking();
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.successIcon}>
          <div className={styles.iconCircle}>
            <Check size={48} strokeWidth={3} />
          </div>
        </div>

        <h1 className={styles.title}>{t('complete.title', 'Your Order is Complete!')}</h1>
        <p className={styles.message}>
          {t('complete.message', 'You will be receiving a confirmation email with order details.')}
        </p>

        {bookingDetails && (
          <div className={styles.bookingDetails}>
            <h3>{t('complete.summary', 'Booking Summary')}</h3>
            <p><strong>{t('complete.refNumber', 'Reference Number')}:</strong> {bookingDetails.refNumber}</p>
            <p><strong>{t('complete.date', 'Date')}:</strong> {bookingDetails.date}</p>
            <p><strong>{t('complete.total', 'Total')}:</strong> €{bookingDetails.total}</p>
          </div>
        )}

        <button className={styles.homeButton} onClick={handleGoHome}>
          {t('complete.goHome', 'Go to Home Page')}
        </button>
      </div>
    </div>
  );
}

export default BookingComplete;
