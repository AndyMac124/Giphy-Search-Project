import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Giphy Search App. All rights reserved.</p>
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