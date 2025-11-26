import { useState } from 'react';
import styles from './BikeBookingFormm.module.css';

function BikeBookingForm({ onNext }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [tickets, setTickets] = useState({
    adult: 0,
    child: 0,
    infant: 0
  });

  const packages = [
    {
      id: 1,
      name: "Mountain Bike Adventure",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400",
      description: "Explore rugged trails and scenic mountain paths",
      adultPrice: 50,
      childPrice: 30,
      infantPrice: 0,
      duration: "4 hours"
    },
    {
      id: 2,
      name: "City Bike Tour",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
      description: "Discover the city's hidden gems on two wheels",
      adultPrice: 35,
      childPrice: 20,
      infantPrice: 0,
      duration: "3 hours"
    }
  ];

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleTicketChange = (type, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setTickets(prev => ({
      ...prev,
      [type]: newValue
    }));
  };

  const handleSubmit = () => {
    if (!selectedPackage) {
      alert('Please select a bike package');
      return;
    }

    if (tickets.adult === 0 && tickets.child === 0) {
      alert('Please select at least one adult or child ticket');
      return;
    }

    onNext({
      packageInfo: selectedPackage,
      tickets: tickets,
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM'
    });
  };

  const totalPrice = selectedPackage ? 
    (tickets.adult * selectedPackage.adultPrice) + 
    (tickets.child * selectedPackage.childPrice) : 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Choose Your Bike Adventure</h2>
      
      <div className={styles.packages}>
        {packages.map(pkg => (
          <div 
            key={pkg.id}
            className={`${styles.packageCard} ${selectedPackage?.id === pkg.id ? styles.selected : ''}`}
            onClick={() => handlePackageSelect(pkg)}
          >
            <img src={pkg.image} alt={pkg.name} className={styles.packageImage} />
            <div className={styles.packageInfo}>
              <h3 className={styles.packageName}>{pkg.name}</h3>
              <p className={styles.packageDescription}>{pkg.description}</p>
              <div className={styles.packageDetails}>
                <span className={styles.duration}>{pkg.duration}</span>
                <span className={styles.price}>From €{pkg.adultPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className={styles.ticketSelection}>
          <h3 className={styles.ticketTitle}>Select Tickets</h3>
          
          <div className={styles.ticketRow}>
            <div className={styles.ticketInfo}>
              <span className={styles.ticketType}>Adult (18+)</span>
              <span className={styles.ticketPrice}>€{selectedPackage.adultPrice}</span>
            </div>
            <div className={styles.ticketControls}>
              <button 
                onClick={() => handleTicketChange('adult', tickets.adult - 1)}
                className={styles.ticketButton}
              >-</button>
              <span className={styles.ticketCount}>{tickets.adult}</span>
              <button 
                onClick={() => handleTicketChange('adult', tickets.adult + 1)}
                className={styles.ticketButton}
              >+</button>
            </div>
          </div>

          <div className={styles.ticketRow}>
            <div className={styles.ticketInfo}>
              <span className={styles.ticketType}>Child (6-17)</span>
              <span className={styles.ticketPrice}>€{selectedPackage.childPrice}</span>
            </div>
            <div className={styles.ticketControls}>
              <button 
                onClick={() => handleTicketChange('child', tickets.child - 1)}
                className={styles.ticketButton}
              >-</button>
              <span className={styles.ticketCount}>{tickets.child}</span>
              <button 
                onClick={() => handleTicketChange('child', tickets.child + 1)}
                className={styles.ticketButton}
              >+</button>
            </div>
          </div>

          <div className={styles.totalSection}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalPrice}>€{totalPrice.toFixed(2)}</span>
          </div>

          <button 
            onClick={handleSubmit}
            className={styles.nextButton}
            disabled={totalPrice === 0}
          >
            Continue to Traveler Info
          </button>
        </div>
      )}
    </div>
  );
}

export default BikeBookingForm;