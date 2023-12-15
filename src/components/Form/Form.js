import React from 'react';
import './Form.css';

const Form = ({
  isRegistering,
  name,
  email,
  password,
  formError,
  onChange,
  onSubmit,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
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
            Error. Please fill out the form properly.
          </p>
        )}
      </form>
    </>
  );
};

export default Form;
