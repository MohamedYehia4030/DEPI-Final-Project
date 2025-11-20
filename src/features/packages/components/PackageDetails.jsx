import React, { useState, useEffect } from "react"; 
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {FiUsers,FiClock,FiMapPin,FiFlag,FiBookOpen,FiDollarSign} from "react-icons/fi";
import PackageGallery from './PackageGallery.jsx';
import { tours } from '../api/data.js';
import { useTranslation } from 'react-i18next';
import styles from "./PackageDetails.module.css";
import Button from '../../../components/Button/Button'; 
import { Col, Form } from 'react-bootstrap';


export default function PackageDetails() {
  const { id } = useParams();
  const { t } = useTranslation(['packages', 'common']);
  
  const packageData = tours.find(tour => tour.id === parseInt(id));
  if (!packageData) {
    return <div className="container py-5">{t('common:notFound')}</div>;
  }

  const [selectedImage, setSelectedImage] = useState(packageData.img);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const times = ["08:00 AM", "09:30 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

  const images = [packageData.img, ...(packageData.subimages || [])];

  useEffect(() => {
    setSelectedImage(packageData.img);
  }, [packageData.img]);

  return (
    <div className={`container py-5 ${styles.mainContainer}`}>

      <div className="row align-items-center">

        {/* LEFT SIDE – IMAGES */}
        <div className="col-md-5">
          <img
            src={selectedImage}
            alt={t(packageData.titleKey)} 
            className={styles.mainImage}
          />

          <div className="d-flex gap-3 mt-3">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`${styles.thumbnail} ${
                  selectedImage === img
                    ? styles.thumbnailActive
                    : styles.thumbnailInactive
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – DETAILS */}
        <div className="col-md-6 p-5">
          <h1 className="fw-bold mt-5" style={{ fontSize: "36px" }}>
            {t(packageData.titleKey)}
          </h1>

          <h4 className="fw-bold mt-1" style={{ color: "var(--color-primary-accent)" }}>
            {t('packages:priceFrom')} <span style={{ color: "var(--color-primary-accent)" }}>{packageData.price}</span>
          </h4>

          <p className={styles.detailsText}>
            {t(packageData.desc || 'packages:defaultDescription')}
          </p>

          {/* DATE SECTION */}
          <label className="fw-semibold mt-2 mb-2">{t('packages:selectDate') || 'Select a date'}</label>
          <div className={styles.calendarBox}>
            <h6 className="fw-semibold mb-3">December 2022</h6>
            <div className="d-flex justify-content-between mb-2" style={{ color: 'var(--color-text-light)' }}>
              <span>Sun</span><span>Mon</span><span>Tue</span>
              <span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            <div className={styles.calendarGrid}>
              {days.map((day) => (
                <div
                  key={day}
                  className={`${styles.calendarDay} ${
                    selectedDay === day
                      ? styles.calendarDayActive
                      : styles.calendarDayInactive
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* TIME SECTION */}
<div className="mt-3">
  <Col md={6} className="p-0 mb-3">
    <label className='mb-1'>Select Time</label>
    <Form.Control type="time" placeholder={t('select the time')} />
  </Col>
</div>

{/* BUY NOW */}
<Button size="medium">Buy Now</Button>
</div>
</div>
      {/* DETAILS SECTION */}
      <div className="mt-5">
        <h4 className={styles.sectionTitle}>{t('packages:detailsSectionTitle') || 'Details'}</h4>
        <p className={styles.detailsText}>
          {t(packageData.longDescKey || 'packages:defaultDescription')}
        </p>

        <div className="row mt-3">
          <div className="col-12 mb-3 d-flex align-items-center">
            <FiUsers size={22} style={{ color: 'var(--color-primary-accent)' }} className="me-2" />
            <span><strong>{t('packages:group')}:</strong> {t(packageData.groupKey)}</span>
          </div>
          <div className="col-12 mb-3 d-flex align-items-center">
            <FiClock size={22} style={{ color: 'var(--color-primary-accent)' }} className="me-2" />
            <span><strong>{t('packages:duration')}:</strong> {t(packageData.duration)}</span>
          </div>
          <div className="col-12 mb-3 d-flex align-items-center">
            <FiMapPin size={22} style={{ color: 'var(--color-primary-accent)' }} className="me-2" />
            <span><strong>{t('packages:areaLabel') || 'Area'}:</strong> {t(packageData.areaKey) || 'Lucca'}</span>
          </div>
          <div className="col-12 mb-3 d-flex align-items-center">
            <FiFlag size={22} style={{ color: 'var(--color-primary-accent)' }} className="me-2" />
            <span><strong>{t('packages:guideLabel') || 'Guide'}:</strong> {t('packages:guideIncluded') || 'Included'}</span>
          </div>
          <div className="col-12 mb-3 d-flex align-items-center">
            <FiBookOpen size={22} style={{ color: 'var(--color-primary-accent)' }} className="me-2" />
            <span><strong>{t('packages:languageLabel') || 'Language'}:</strong> {t('packages:languagesList') || 'English, Italian'}</span>
          </div>
          <div className="col-12 mb-3 d-flex align-items-center">
            <FiDollarSign size={22} style={{ color: 'var(--color-primary-accent)' }} className="me-2" />
            <span><strong>{t('packages:feesLabel') || 'Fees'}:</strong> {t('packages:feesIncluded') || 'Included'}</span>
          </div>
        </div>
      </div>

      <PackageGallery galleryImages={packageData.gallery} />
    </div>
  );
}
