// src/components/ConfirmEmail.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ConfirmEmail() {
  const query = useQuery();
  const token = query.get('token');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      if (token) {
        try {
          const response = await fetch(`http://127.0.0.1:5050/api/auth/confirm-email?token=${token}`, {
            method: 'GET',
          });
          const data = await response.json();

          if (response.ok) {
            setMessage(data.msg || 'Email confirmation successful!');
            // Optionally redirect after confirmation
            setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
          } else {
            setMessage(data.msg || 'Failed to confirm email.');
          }
        } catch (error) {
          console.error('Error confirming email:', error);
          setMessage('An error occurred while confirming your email.');
        }
      } else {
        setMessage('No confirmation token provided.');
      }
    };

    confirmEmail();
  }, [token, navigate]);

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>{message}</p>
    </div>
  );
}

export default ConfirmEmail;
