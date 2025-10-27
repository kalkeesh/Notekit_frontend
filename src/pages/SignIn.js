import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isGmailAccount = (email) => email.endsWith('@gmail.com');
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let formIsValid = true;

    if (!isValidEmail(formData.email) || !isGmailAccount(formData.email)) {
      newErrors.email = 'Please enter a valid Gmail address.';
      formIsValid = false;
    }
    if (!isValidPassword(formData.password)) {
      newErrors.password =
        'Password must be at least 9 characters long, include one uppercase letter, one number, and one special character.';
      formIsValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      formIsValid = false;
    }

    setErrors(newErrors);
    if (!formIsValid) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/signup`,
        formData
      );
      if (response.status === 200) {
        alert('Sign-up successful! Check your email for confirmation.');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('This email is already registered.');
      } else {
        console.error('Sign-up error:', error);
        alert('An error occurred during sign-up. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <div className="login-link">
            <span>Already have an account? <a href="/login">Login</a></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
