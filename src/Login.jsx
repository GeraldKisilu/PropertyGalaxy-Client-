import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    fetch('http://127.0.0.1:5050/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Login failed');
        }
      })
      .then(data => {
        if (data.token) {
          console.log(data);
          setToastMessage('User Successfully logged in!');
          setShowToast(true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("userId", data.userId);

          // Check user's role and navigate accordingly
          if (data.role_id === 1) {
            navigate('/admin-dashboard'); // Admin route
          } else if (data.role_id === 2) {
            navigate('/agent-dashboard');
          } else {
            navigate('/user-dashboard'); // Regular user route
          }
        } else {
          setToastMessage(data.msg || 'Login failed');
          setShowToast(true);
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        setToastMessage('Error: ' + error.message);
        setShowToast(true);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="email">Email:</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label htmlFor="password">Password:</label>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
        </div>
        <button type="submit" className="login-button" style={{ marginBottom: '30px' }}>Login</button>
      </form>
      <div style={{ marginBottom: '10px' }}>
        <Link to='/forgot-password' style={{ color: 'black' }}>Forgot Password? </Link>
      </div>
      <div>
        <Link to='/register' style={{ color: 'black' }}>DON'T HAVE AN ACCOUNT? </Link>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src="..." className="rounded me-2" alt="..." />
              <strong className="me-auto">Login Notification</strong>
              <small>Just now</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setShowToast(false)}></button>
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
