import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import homeStyles from '../../pages/Home/Home.module.css';

/**
 * Header component
 * 
 * Displays the app logo in the header.
 * Clicking the header navigates back to the home page.
 */
const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header
      className={styles.header}
      onClick={() => navigate('/')}
    >
      <div className={styles['home-logo']}>
        <img src="/giphysearch.png" alt="Giphy Search Logo" />
      </div>
    </header>
  );
};

export default Header;