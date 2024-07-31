import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add your API call here to register the user
  };

  return (
    <div className="registration-form-container">
      <h2>Join Our Real Estate Community</h2>
      <p>Create an account to explore properties and connect with agents.</p>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>
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
            placeholder="Create a password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="userType">Register as:</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
