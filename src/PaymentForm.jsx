import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');
  const userId = searchParams.get('userId');

  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propertyId && userId) {
      // You can use propertyId and userId here if needed
      console.log('Property ID:', propertyId);
      console.log('User ID:', userId);
    }
  }, [propertyId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount: parseFloat(amount),
      currency: currency,
      payment_method: paymentMethod,
      property_id: propertyId,
      user_id: userId
    };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5050/payments/make-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error('Failed to make payment');
      }

      const data = await response.json();
      setResponseMessage(data.message);
      setErrorMessage('');
      setAmount('');
      setCurrency('USD');
      setPaymentMethod('');
    } catch (error) {
      console.error('Error making payment:', error);
      setErrorMessage('Error making payment. Please try again.');
      setResponseMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Submit Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label>Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            {/* Add more currencies as needed */}
          </select>
        </div>
        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            placeholder="Enter payment method"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default PaymentForm;
