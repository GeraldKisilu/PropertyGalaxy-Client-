import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://127.0.0.1:5050/auth/reset-password-request`, { email });
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
      <h2>Reset Your Password</h2>
      <p style={{marginBottom: '60px'}}>To reset your password,  provide us with the email address you used during registration </p>
      <div className="form-group" style={{marginBottom: '30px'}}>
          <label htmlFor="email">Email:</label>
          <div>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your Email Address"
          />
          </div>
      </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
    </form>
  );
};

export default ForgotPassword;
