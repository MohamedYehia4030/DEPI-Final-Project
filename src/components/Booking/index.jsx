import React, { useState } from 'react';

// Step Components
import BikeBookingForm from './BikeBookingForm/BikeBookingForm';
import BookingForm from './BookingForm/BookingForm';
import BookingSummary from './BookingSummary/BookingSummary';
import BookingPayment from './BookingPayment/BookingPayment';
import BookingComplete from './BookingComplete/BookingComplete';

// Styles
import './booking.css';

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);

  const [bookingData, setBookingData] = useState({
    packageInfo: {
      name: "Mountain Bike Adventure",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
      adultPrice: 50,
      childPrice: 30,
      infantPrice: 0
    },
    tickets: {
      adult: 2,
      child: 1,
      infant: 0
    },
    date: "2024-01-15",
    time: "10:00 AM",
    traveler: {
      name: "",
      surname: "",
      phone: "",
      email: ""
    }
  });

  const handleNextStep = (data = {}) => {
    setBookingData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBackStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const calculateTotal = () => {
    const { tickets, packageInfo } = bookingData;
    return (
      tickets.adult * packageInfo.adultPrice +
      tickets.child * packageInfo.childPrice +
      tickets.infant * packageInfo.infantPrice
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BikeBookingForm onNext={handleNextStep} />;

      case 2:
        return (
          <div className="booking-layout">
            <div className="form-section">
              <BookingForm
                data={bookingData}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            </div>

            <div className="summary-section">
              <BookingSummary
                packageInfo={bookingData.packageInfo}
                tickets={bookingData.tickets}
                date={bookingData.date}
                time={bookingData.time}
                totalPrice={calculateTotal()}
                showButton={false}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="booking-layout">
            <div className="form-section">
              <BookingPayment
                data={bookingData}
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            </div>

            <div className="summary-section">
              <BookingSummary
                packageInfo={bookingData.packageInfo}
                tickets={bookingData.tickets}
                date={bookingData.date}
                time={bookingData.time}
                totalPrice={calculateTotal()}
                showButton={false}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <BookingComplete
            bookingDetails={{
              refNumber: `BK-${Date.now()}`,
              date: bookingData.date,
              total: calculateTotal().toFixed(2),
            }}
          />
        );

      default:
        return <BikeBookingForm onNext={handleNextStep} />;
    }
  };

  return (
    <div className="booking-wrapper">
      {currentStep < 4 && (
        <div className="progress-bar">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Select Bikes</p>
          </div>

          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Traveler Info</p>
          </div>

          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Payment</p>
          </div>

          <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
            <span>4</span>
            <p>Confirmation</p>
          </div>
        </div>
      )}

      {renderStep()}
    </div>
  );
}
