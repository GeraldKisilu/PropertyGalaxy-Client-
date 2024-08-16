import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
          setToastMessage('User Successfully logged in!');
          setShowToast(true);
          localStorage.setItem("token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("userId", data.userId);

          // Navigate based on user role
          if (data.role_id === 1) {
            navigate('/admin-dashboard');
          } else if (data.role_id === 2) {
            navigate('/agent-dashboard');
          } else {
            navigate('/user-dashboard');
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
    <div style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2em',
        borderRadius: '15px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5em' }}>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5em',
              color: '#555',
              fontWeight: 'bold',
            }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '0.75em',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em',
                boxSizing: 'border-box',
                transition: 'border 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#c78880'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5em',
              color: '#555',
              fontWeight: 'bold',
            }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75em',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1em',
                boxSizing: 'border-box',
                transition: 'border 0.3s ease',
              }}
              onFocus={(e) => e.target.style.borderColor = '#c78880'}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '0.75em',
            border: 'none',
            borderRadius: '30px',
            background: '#c78880',
            color: '#fff',
            fontWeight: '600',
            fontSize: '1em',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            marginTop: '1em',
          }}>Login</button>
        </form>
        <div style={{ marginTop: '1.5em', fontSize: '0.9em' }}>
          <Link to='/forgot-password' style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}>Forgot Password?</Link>
          <br />
          <Link to='/register' style={{
            textDecoration: 'none',
            fontWeight: 'bold',
          }}>DON'T HAVE AN ACCOUNT?</Link>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 11,
          }}>
            <div style={{
              background: '#333',
              color: '#fff',
              borderRadius: '5px',
              padding: '0.75em',
            }}>
              <strong style={{ display: 'block', marginBottom: '0.5em' }}>Notification</strong>
              <small style={{ display: 'block', marginBottom: '0.5em' }}>Just now</small>
              <button type="button" onClick={() => setShowToast(false)} style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.25em',
                cursor: 'pointer',
              }}>✖</button>
              <div style={{ padding: '0.75em' }}>
                {toastMessage}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
