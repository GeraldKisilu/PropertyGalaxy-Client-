import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();

    const { fullName, email, password, password2 } = formData;

    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    fetch('http://127.0.0.1:5050/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, email: email, password: password, password2: password2 }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .then((data) => {
        console.log('User registered successfully', data);
        alert('User registered successfully. A confirmation email has been sent to your account.');
      })
      .catch((error) => {
        console.error('Error:', error.message);
        setErrorMessage('Error: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div  style={{
      maxWidth: '400px',
      margin: '0 auto',
      padding: '2em',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '1em' }}>Join Our Real Estate Community</h2>
      <p style={{ marginBottom: '1.5em' }}>Create an account to explore properties and connect with agents.</p>
      <form onSubmit={handleSubmitSignup} style={{ textAlign: 'left' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="fullName" style={{ display: 'block', marginBottom: '0.5em' }}>Full name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '0.75em',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1em',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5em' }}>Email:</label>
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
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5em' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
            style={{
              width: '100%',
              padding: '0.75em',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1em',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '30px' }}>
          <label htmlFor="password2" style={{ display: 'block', marginBottom: '0.5em' }}>Confirm Password:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
            placeholder="Confirm password"
            style={{
              width: '100%',
              padding: '0.75em',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1em',
              boxSizing: 'border-box',
            }}
          />
        </div>
        {errorMessage && <p style={{ color: 'red', marginBottom: '20px' }}>{errorMessage}</p>}
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
        }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
