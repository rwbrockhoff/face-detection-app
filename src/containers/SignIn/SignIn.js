import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../redux/slices/userSlice';
import Form from '../../components/Form/Form';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const authError = useSelector((state) => ({
    error: state.user.authError,
    message: state.user.authErrorMessage,
  }));

  const dispatch = useDispatch();

  const onFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSignIn = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      // return onFormError();
    }
    dispatch(signInUser({ email, password }));
  };

  const { email, password } = formData;
  return (
    <div className="gradient-background flex-center-all">
      <Form
        isRegistering={false}
        title={'Sign In'}
        email={email}
        password={password}
        formError={authError.error}
        formErrorMessage={authError.message}
        onChange={onFormChange}
        onSubmit={onSignIn}
      />
    </div>
  );
}
