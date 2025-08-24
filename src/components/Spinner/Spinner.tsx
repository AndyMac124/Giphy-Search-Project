import React from 'react';
import styles from './Spinner.module.css';

interface LoadingSpinnerProps {
  // Whether the spinner is visible
  isLoading: boolean;
  // Color of the spinner (default: blue)
  color?: string;
  // Size of the spinner: small, medium, or large (default: medium)
  size?: 'small' | 'medium' | 'large';
}

/**
 * Spinner component
 * 
 * Displays a rotating loading indicator when `isLoading` is true.
 * Supports different sizes and custom colors.
 */
const Spinner: React.FC<LoadingSpinnerProps> = ({ isLoading, color = '#3498db', size = 'medium' }) => {
  if (!isLoading) return null;

  // Apply custom color to the spinner
  const spinnerStyle = {
    borderTopColor: color,
  };

  return (
    <div className={`${styles.spinnerContainer} ${styles[size]}`}>
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;