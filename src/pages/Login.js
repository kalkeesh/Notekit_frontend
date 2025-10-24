import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        formData
      );
      if (response.status === 200) {
        const { token, name } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', name || '');
        
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert(error.response.data.detail || error.response.data.message || 'Invalid credentials');
        } else {
          alert('An error occurred during login. Please try again.');
        }
      } else {
        console.error('Error logging in', error);
        alert('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: 'url("/bg.jpg")' }}>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="input-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="input-white"
          />
          <button type="submit">Login</button>
        </form>
        <Link to={`/forgot-password?email=${formData.email}`}>Forgot Password?</Link>
        <span>Don't have an account? <a href="/signin">Sign Up</a></span>
      </div>
    </div>
  );
}

export default Login;
