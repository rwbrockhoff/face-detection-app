import React from 'react';
import './Form.css';

const Form = ({
  isRegistering,
  title = 'Form',
  name,
  email,
  password,
  formError,
  formErrorMessage,
  onChange,
  onSubmit,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>
        {isRegistering ? (
          <input
            placeholder="Name"
            value={name}
            name="name"
            onChange={onChange}
          />
        ) : null}
        <input
          placeholder="Email"
          type="email"
          value={email}
          name="email"
          onChange={onChange}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          name="password"
          onChange={onChange}
        />
        <button>{isRegistering ? 'Register' : 'Sign In'}</button>
        {formError && (
          <p className="error-text">
            {formErrorMessage || 'Sorry! Looks like something went wrong.'}
          </p>
        )}
      </form>
    </>
  );
};

export default Form;
