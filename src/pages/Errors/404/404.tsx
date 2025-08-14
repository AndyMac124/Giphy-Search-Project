import React from 'react';
import { Link } from 'react-router-dom';
import './404.css';

const NotFound: React.FC = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default NotFound;