import React, { useState } from "react";
import styles from "./PackageGallery.module.css";
import { Carousel } from "react-bootstrap";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export default function PackageGallery({galleryImages = [] }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const carouselItems = [galleryImages,galleryImages,galleryImages];
    
  

  return (
    <div className={`${styles.gallerySection} container my-5`}>
      {/* Header */}
      <div className={styles.galleryHeader}>
        <h3 className={styles.galleryTitle}>Gallery</h3>
        <div className={styles.carouselButtons}>
          <button
            className={`${styles.arrowBtn} ${styles.grayBtn}`}
            onClick={handleNext}
          >
            <FiChevronLeft />
          </button>
          <button
            className={`${styles.arrowBtn} ${styles.blueBtn}`}
            onClick={handlePrev}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        controls={false}
      >
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx}>
            <div className={styles.galleryGrid}>
              <img className={styles.bigImg} src={item[0]} alt="" />
              <div className={styles.smallColumn}>
                <img src={item[1]} alt="" />
                <img src={item[2]} alt="" />
              </div>
              <img className={styles.tallImg} src={item[3]} alt="" />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
