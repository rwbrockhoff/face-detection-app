import React from 'react';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';
import Logo from '../Logo/Logo';

const Navigation = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => dispatch(signOutUser());
  return (
    <nav>
      <Logo />
      {isAuthenticated ? (
        <p className="sign-in link" onClick={signOut}>
          Sign Out
        </p>
      ) : (
        <p className="sign-in link" onClick={() => navigate('/register')}>
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
