import React from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ isAuthenticated }) => {
  return (
    <nav>
      <Logo />
      {isAuthenticated ? (
        <p className="sign-in link">Sign Out</p>
      ) : (
        <p className="sign-in link">Register</p>
      )}
    </nav>
  );
};

export default Navigation;
