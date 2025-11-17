import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUsers, FiCalendar, FiClock, FiFlag, FiTruck, FiSearch, FiGlobe } from 'react-icons/fi';
import { HiUsers } from 'react-icons/hi';
import styles from './HeroSearchForm.module.css';

function HeroSearchForm() {
  const { t } = useTranslation('home');
  const [tourType, setTourType] = useState('public');
  const [formData, setFormData] = useState({
    numberOfPeople: '',
    date: '',
    time: '',
    tour: '',
    transportation: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', { tourType, ...formData });
  };

  return (
    <div className={styles.searchFormContainer}>
      <div className={styles.tourTypeTabs}>
        <button
          className={`${styles.tab} ${tourType === 'public' ? styles.active : ''}`}
          onClick={() => setTourType('public')}
        >
          <FiGlobe className={styles.tabIcon} />
          {t('publicTours', 'Public Tours')}
        </button>
        <button
          className={`${styles.tab} ${tourType === 'private' ? styles.active : ''}`}
          onClick={() => setTourType('private')}
        >
          <HiUsers className={styles.tabIcon} />
          {t('privateTours', 'Private Tours')}
        </button>
      </div>

      <form className={styles.searchForm} onSubmit={handleSearch}>
        <div className={styles.formFields}>
          <div className={styles.formField}>
            <FiUsers className={styles.fieldIcon} />
            <select
              className={styles.input}
              value={formData.numberOfPeople}
              onChange={(e) => handleInputChange('numberOfPeople', e.target.value)}
            >
              <option value="">{t('chooseNumberOfPeople', 'Choose number')}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5+</option>
            </select>
          </div>

          <div className={styles.formField}>
            <FiCalendar className={styles.fieldIcon} />
            <input
              type="date"
              className={styles.input}
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              placeholder={t('chooseDate', 'Choose Date')}
            />
          </div>

          <div className={styles.formField}>
            <FiClock className={styles.fieldIcon} />
            <input
              type="time"
              className={styles.input}
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              placeholder={t('chooseTime', 'Choose Time')}
            />
          </div>

          <div className={styles.formField}>
            <FiFlag className={styles.fieldIcon} />
            <select
              className={styles.input}
              value={formData.tour}
              onChange={(e) => handleInputChange('tour', e.target.value)}
            >
              <option value="">{t('selectTour', 'Select Tour')}</option>
              <option value="tuscany">Tuscany Wine Tasting</option>
              <option value="florence">Florence City Tour</option>
              <option value="venice">Venice Canal Tour</option>
            </select>
          </div>

          <div className={styles.formField}>
            <FiTruck className={styles.fieldIcon} />
            <select
              className={styles.input}
              value={formData.transportation}
              onChange={(e) => handleInputChange('transportation', e.target.value)}
            >
              <option value="">{t('selectTransportation', 'Select Transportation')}</option>
              <option value="car">Car</option>
              <option value="bus">Bus</option>
              <option value="van">Van</option>
            </select>
          </div>
        </div>

        <button type="submit" className={styles.searchButton}>
          <FiSearch className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
}

export default HeroSearchForm;
