import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../../redux/slices/userSlice';
import Form from '../../components/Form/Form';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();

  const onFormChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormError = () => {
    setFormError(true);
  };

  const onSignIn = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      return onFormError();
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
        formError={formError}
        onChange={onFormChange}
        onSubmit={onSignIn}
      />
    </div>
  );
}
