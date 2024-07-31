import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://127.0.0.1:5000/auth/reset-password-request`, { email });
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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Request Password Reset'}
      </button>
    </form>
  );
};

export default ForgotPassword;
