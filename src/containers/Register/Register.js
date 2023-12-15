import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/userSlice';
import Form from '../../components/Form/Form';
import Logo from '../../assets/logo.png';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const authError = useSelector((state) => ({
    error: state.user.authError,
    message: state.user.authErrorMessage,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      // return setFormError(true);
    }

    dispatch(registerUser({ name, email, password }));
  };

  const { name, email, password } = formData;
  return isAuthenticated ? (
    navigate('/')
  ) : (
    <div className="gradient-background full-height">
      <img src={Logo} alt="logo" />
      <Form
        isRegistering={true}
        title={'Register'}
        name={name}
        email={email}
        password={password}
        formError={authError.error}
        formErrorMessage={authError.message}
        onChange={onFormChange}
        onSubmit={onFormRegister}
      />
    </div>
  );
}
