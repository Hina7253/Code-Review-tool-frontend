import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPages.css';

const BACKEND_URL = 'http://localhost:8080/api/auth';

function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        username: formData.username,
        password: formData.password
      });

      // Save token and user info
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Call parent callback
      onLogin(token);
      
      // Navigate to home
      navigate('/');
      
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Invalid credentials');
      } else if (err.request) {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>☕ Java Code Analyzer</h1>
          <p>Sign in to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {error && (
            <div className="error-message">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={loading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register">Register here</Link>
          </p>
        </form>

        <div className="auth-footer">
          <p>Powered by Spring Boot & React</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;