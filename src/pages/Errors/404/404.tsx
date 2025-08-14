import React from 'react';
import { Link } from 'react-router-dom';
import styles from './404.module.css';

/**
 * NotFound Component
 * 
 * Displays a 404 page when the user navigates to a non-existent route.
 * - Shows a large 404 heading
 * - Provides a friendly message
 * - Includes a link to navigate back to the homepage
 */
const NotFound: React.FC = () => {
  return (
    <div className={styles['notfound-container']}>
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;