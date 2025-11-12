import './BookingPage.css';

import BookingForm from './BookingForm.jsx';
import BookingSummary from './BookingSummary.jsx';

const BookingPage = () => {
  return (
    <main className="booking-page">
      <BookingForm />
      <BookingSummary />
    </main>
  );
};

export default BookingPage;
