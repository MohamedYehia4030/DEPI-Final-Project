import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Slider.module.css';
import { Carousel } from 'react-bootstrap';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

/**
 * Props:
 * - reviews: array of grouped review arrays (each item is an array of 1-2 review objects)
 * - renderReview: function(review, index) => ReactNode (renders the review card)
 */
const Slider = ({ children, perSlide = 2, maxWidth }) => {
  const items = React.Children.toArray(children || []);
  const grouped = [];
  for (let i = 0; i < items.length; i += perSlide) grouped.push(items.slice(i, i + perSlide));
  const [index, setIndex] = useState(0);

  const { i18n } = useTranslation();
  const isRTL = i18n && typeof i18n.dir === 'function' ? i18n.dir() === 'rtl' : false;

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);
  const handlePrev = () => setIndex((prev) => (prev === 0 ? grouped.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === grouped.length - 1 ? 0 : prev + 1));

  const prevDisabled = grouped.length === 0 || index === 0;
  const nextDisabled = grouped.length === 0 || index === grouped.length - 1;

  // Icons should reflect writing direction: swap for RTL
  const PrevIcon = isRTL ? FiChevronRight : FiChevronLeft;
  const NextIcon = isRTL ? FiChevronLeft : FiChevronRight;

  // allow callers to override the container max width via `maxWidth` prop
  const containerStyle = {};
  if (maxWidth) {
    containerStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  }

  return (
    <div className={styles.sliderContainer} dir={isRTL ? 'rtl' : 'ltr'} style={containerStyle}>
      <div className={styles.carouselHeader}>
        <div className={styles.carouselButtons}>
          <button
            className={`${styles.arrowBtn} ${prevDisabled ? styles.grayBtn : styles.blueBtn}`}
            onClick={handlePrev}
            aria-label={isRTL ? 'Next' : 'Previous'}
            disabled={prevDisabled}
          >
            <PrevIcon />
          </button>
          <button
            className={`${styles.arrowBtn} ${nextDisabled ? styles.grayBtn : styles.blueBtn}`}
            onClick={handleNext}
            aria-label={isRTL ? 'Previous' : 'Next'}
            disabled={nextDisabled}
          >
            <NextIcon />
          </button>
        </div>
      </div>

      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false}>
        {grouped.map((group, gidx) => (
          <Carousel.Item key={gidx}>
            <div className="row">
              {group.map((child, idx) => {
                // compute bootstrap column size based on `perSlide`
                const colSize = Math.max(1, Math.min(12, Math.floor(12 / perSlide)));
                const colClass = `col-12 col-md-${colSize}`;
                return (
                  <div className={colClass} key={idx}>
                    {child}
                  </div>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
