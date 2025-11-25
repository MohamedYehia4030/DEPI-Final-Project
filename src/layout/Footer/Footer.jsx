// src/components/Footer/Footer.jsx

import React from 'react';
import styles from './Footer.module.css';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'; // Import icons for contact

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* --- Services Column --- */}
          <div className={styles.col}>
            <h5>Services</h5>
            <ul>
              <li><a href="/services/bike-rickshaw">Bike and Rickshaw rental</a></li>
              <li><a href="/services/guided-tours">Guided Tours of Lucca</a></li>
              <li><a href="/services/bike-tour">Guided Bike Tour of Lucca</a></li>
              <li><a href="/services/tuscan-hills">Trip In The Tuscan Hills</a></li>
              <li><a href="/services/transportation">Transportation With Luxury Cars</a></li>
              <li><a href="/services/wine-tours">Wine Tours By Bus With Guide</a></li>
            </ul>
          </div>

          {/* --- Home Column --- */}
          <div className={styles.col}>
            <h5>Home</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/packages">Tour Packages</a></li>
            </ul>
          </div>

          {/* --- Help Column --- */}
          <div className={styles.col}>
            <h5>Help</h5>
            <ul>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>

          {/* --- Contacts Column --- */}
          <div className={`${styles.col} ${styles.colContact}`}>
            <h5>Contacts</h5>
            <ul className={styles.contactList}>
              <li>
                <span className={styles.contactIcon}><FiMapPin size={16} /></span>
                Piazza Napoleone, Lucca, Tuscany
              </li>
              <li>
                <span className={styles.contactIcon}><FiPhone size={16} /></span>
                <a href="tel:+393463685708">+39 346 368 5708</a>
              </li>
              <li>
                <span className={styles.contactIcon}><FiMail size={16} /></span>
                <a href="mailto:italianlimo@gmail.com">italianlimo@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* --- Social Media Column --- */}
          <div className={styles.col}>
            <h5>Social Media</h5>
            <div className={styles.socials}>
              <a className={styles.socialBtn} href="#" aria-label="twitter">
                <FaTwitter />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="facebook">
                <FaFacebookF />
              </a>
              <a className={styles.socialBtn} href="#" aria-label="instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.copyright}>
          <p>Copyright © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}