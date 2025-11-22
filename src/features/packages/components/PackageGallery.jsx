import React from "react";
import styles from "./PackageGallery.module.css";
import Slider from "../../../components/Slider/Slider";

export default function PackageGallery({ galleryImages = [] }) {
  // Preserve previous behaviour where three identical slides were shown
  const carouselItems = [galleryImages, galleryImages, galleryImages];

  const slideNodes = carouselItems.map((item, idx) => (
    <div className={styles.galleryGrid} key={idx}>
      <img className={styles.bigImg} src={item[0]} />
      <div className={styles.smallColumn}>
        <img src={item[1]} />
        <img src={item[2]} />
      </div>
      <img className={styles.tallImg} src={item[3]} />
    </div>
  ));

  return (
    <div className={`${styles.gallerySection} container my-5`}>
      {/* Header */}
      <div className={styles.galleryHeader}>
        <h3 className={styles.galleryTitle}>Gallery</h3>
      </div>

      <Slider perSlide={1}>{slideNodes}</Slider>
    </div>
  );
}
