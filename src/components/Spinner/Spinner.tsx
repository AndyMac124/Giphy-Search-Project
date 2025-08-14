import React from 'react';
import './Spinner.css';

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
    <div className={`spinner-container ${size}`}>
      <div className="spinner" style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
