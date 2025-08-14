import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer component
 * 
 * Displays site footer with copyright information and a link
 * to the Baseline.js project used in the application.
 */
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Andrew McKenzie</p>

      <p>
        Built with{' '}
        <a
          href="https://github.com/Baseline-JS/core"
          target="_blank"
          rel="noopener noreferrer"
        >
          Baseline.js
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;