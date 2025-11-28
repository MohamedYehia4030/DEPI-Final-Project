import { Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './BookingSummary.module.css';

function BookingSummary({
  packageInfo,
  tickets,
  date,
  time,
  totalPrice,
  onNext,
  showButton,
}) {
  const { t } = useTranslation('booking');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('yourTicketsOverview')}</h2>

      <div className={styles.package}>
        <img
          src={packageInfo.image}
          alt={packageInfo.name}
          className={styles.packageImage}
        />
        <div className={styles.packageInfo}>
          <h3 className={styles.packageName}>{packageInfo.name}</h3>
          {date && (
            <div className={styles.packageDetail}>
              <Calendar size={16} />
              <span>{date}</span>
            </div>
          )}
          {time && (
            <div className={styles.packageDetail}>
              <Clock size={16} />
              <span>{time}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tickets}>
        {tickets.adult > 0 && (
          <div className={styles.ticketRow}>
            <div className={styles.ticketInfo}>
              <span className={styles.ticketCount}>{tickets.adult}</span>
              <span className={styles.ticketType}>
                {t('adult')} (18+) (€{packageInfo.adultPrice.toFixed(2)})
              </span>
            </div>
            <span className={styles.ticketPrice}>
              €{(tickets.adult * packageInfo.adultPrice).toFixed(2)}
            </span>
          </div>
        )}

        {tickets.child > 0 && (
          <div className={styles.ticketRow}>
            <div className={styles.ticketInfo}>
              <span className={styles.ticketCount}>{tickets.child}</span>
              <span className={styles.ticketType}>
                {t('child')} (6-17) (€{packageInfo.childPrice.toFixed(2)})
              </span>
            </div>
            <span className={styles.ticketPrice}>
              €{(tickets.child * packageInfo.childPrice).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>{t('totalPrice')}</span>
        <span className={styles.totalPrice}>€{totalPrice.toFixed(2)}</span>
      </div>

      {showButton && (
        <button className={styles.nextButton} onClick={onNext}>
          {t('goToNextStep')}
        </button>
      )}
    </div>
  );
}

export default BookingSummary;
