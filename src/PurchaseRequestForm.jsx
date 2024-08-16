import React, { useState } from 'react';
import axios from 'axios';
import './PurchaseRequestForm.css'; // Import the CSS file for styling

const PurchaseRequestForm = ({ propertyId }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://phase-5-group-project-backend-24.onrender.com/purchase_request/list',
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
    <div className="purchase-request-form">
     
      <form onSubmit={handleSubmit}>
        <button type="submit" className="submit-button">Request Payment</button>
      </form>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default PurchaseRequestForm;