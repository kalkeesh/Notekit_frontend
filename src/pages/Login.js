import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          alert(error.response.data.detail || 'Invalid credentials');
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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card-container">
        <div className="card">
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control mb-4"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-control mb-3"
                required
              />

              <div className="text-end mb-3">
                <Link to={`/forgot-password?email=${formData.email}`} className="small-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Login
              </button>
            </form>

            <div className="text-center mt-4">
              <span>Don't have an account? <Link to="/signin" className="small-link">Register</Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
