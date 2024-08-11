import React, { useState } from 'react';
import axios from 'axios';

const PurchaseRequestForm = ({ propertyId }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:5050/purchase_request/list',
        {
          property_id: propertyId,
          status: 'Pending',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setMessage('Purchase request submitted successfully!');
      setError('');
    } catch (err) {
      setError('Error submitting purchase request. Please try again.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Request to Purchase Property</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Request Payment</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PurchaseRequestForm;