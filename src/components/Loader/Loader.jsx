import React from 'react';
import styles from './Loader.module.css';
import PageWrapper from '../PageWrapper/PageWrapper';

const Loader = ({ 
  size = 'medium', 
  color = 'primary', 
  fullScreen = false, 
  inline = false,
  message = '' 
}) => {
  const loaderClasses = [
    styles.loader,
    styles[`size-${size}`],
    styles[`color-${color}`],
    fullScreen ? styles.fullScreen : '',
    inline ? styles.inline : ''
  ].filter(Boolean).join(' ');

  const loaderContent = (
    <div className={loaderClasses}>
      <div className={styles.spinner}></div>
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );

  if (fullScreen) {
    return <PageWrapper>{loaderContent}</PageWrapper>;
  }

  return loaderContent;
};

export default Loader;
