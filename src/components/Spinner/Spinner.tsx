import React from 'react';
import styles from './Spinner.module.css';

interface LoadingSpinnerProps {
  isLoading: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const Spinner: React.FC<LoadingSpinnerProps> = ({ isLoading, color = 'blue', size = 'medium' }) => {
  if (!isLoading) {
    return null;
  }

  const spinnerStyle = {
    borderColor: color,
    borderTopColor: color,
  };

  return (
    <div className={`${styles['spinner-container']} ${styles[size]}`}>
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
