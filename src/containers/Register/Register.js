import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import { faceDetectionAPI } from '../../axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      formError: false,
    };
  }

  onFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormError = () => {
    this.setState({ formError: true });
  };

  onFormRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    if (!name || !email || !password) return this.onFormError();
    try {
      const { response } = await faceDetectionAPI.post('/register', {
        name,
        email,
        password,
      });
      if (response.user) this.setState({ user: response.user });
    } catch (error) {
      this.onFormError();
    }
  };

  render() {
    const { name, email, password, formError } = this.state;
    return (
      <div className="gradient-background">
        <h2 className="title">Register</h2>
        <Form
          isRegistering={true}
          name={name}
          email={email}
          password={password}
          formError={formError}
          onChange={this.onFormChange}
          onSubmit={this.onFormRegister}
        />
      </div>
    );
  }
}

export default Register;
