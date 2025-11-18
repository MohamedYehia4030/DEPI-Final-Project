import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';


const Button = ({ 
  children, 
  variant = 'primary', // Options: 'primary', 'outline'
  size = 'large',      // Options: 'large', 'small'
  className,           // For custom overrides
  ...props 
}) => {
  
  const buttonClasses = clsx(
    styles.btn,              // 1. Base styles
    styles[variant],         // 2. Color variant (primary/outline)
    styles[size],            // 3. Size variant (large/small)
    className                // 4. Custom class
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;