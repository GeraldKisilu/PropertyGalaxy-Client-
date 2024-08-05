import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
          console.log(data)
          alert("User Successfully logged in!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);

          // Check user's role and navigate accordingly
          if (data.role_id === 1) {
            navigate('/admin-dashboard'); // Admin route
          } else if (data.role_id === 2) {
            navigate('/agent-dashboard')
          }else {
            navigate('/user-dashboard'); // Regular user route
          }
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        alert('Error: ' + error.message);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
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
        <div className="form-group">
          <label htmlFor="password">Password:</label>
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
        <button type="submit" className="login-button">Login</button>
      </form>
      <div>
        <Link to='/forgot-password'>Forgot Password </Link> 
      </div>
      <div>
        <Link to='/register'>DON'T HAVE AN ACCOUNT? </Link> 
      </div>
    </div>
  );
}

export default Login;
