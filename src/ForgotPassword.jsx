import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://127.0.0.1:5050/api/auth/reset-password-request`, { email });
      alert('If the email is registered, a reset link will be sent.');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Invalid request. Please check the email address and try again.');
      } else {
        alert('An error occurred. Please try again later.');
      }
      console.error('Error requesting password reset:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reset Your Password</h2>
      <p style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'center' }}>
        To reset your password, provide us with the email address you used during registration.
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your Email Address"
            style={{ width: '100%', padding: '8px', fontSize: '16px', border: '2px solid solid', borderRadius: '2px' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
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
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
