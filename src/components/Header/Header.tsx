import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header" onClick={() => navigate('/')}>
      <h1>Giphy Search</h1>
    </header>
  );
};

export default Header;