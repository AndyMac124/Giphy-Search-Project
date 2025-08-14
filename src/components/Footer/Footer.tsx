import React from 'react';
import styles from './Footer.module.css';

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