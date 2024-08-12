import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get('propertyId');
  const userId = searchParams.get('userId');

  const [amount, setAmount] = useState(''); 
  const [clientSecret, setClientSecret] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Installment related states
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [installmentAmount, setInstallmentAmount] = useState('');

  useEffect(() => {
    if (propertyId && userId && amount) {
      const fetchClientSecret = async () => {
        try {
          const response = await fetch('http://localhost:5050/userpayment/create-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: parseFloat(amount),
              property_id: propertyId,
              user_id: userId,
              total_installments: totalInstallments,
              installment_amount: parseFloat(installmentAmount),
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch client secret');
          }

          setClientSecret(data.client_secret);
        } catch (error) {
          setErrorMessage(`Error fetching client secret: ${error.message}`);
          console.error('Error fetching client secret:', error.message);
        }
      };

      fetchClientSecret();
    }
  }, [amount, propertyId, userId, totalInstallments, installmentAmount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            // Add any additional billing details here, e.g., email, name
          },
        },
      });

      if (error) {
        setErrorMessage(`Payment failed: ${error.message}`);
        console.error('Payment failed:', error.message);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        try {
          const paymentData = {
            amount: parseFloat(amount),
            property_id: propertyId,
            user_id: userId,
            payment_intent_id: paymentIntent.id,
            total_installments: totalInstallments,
            installment_amount: parseFloat(installmentAmount),
          };

          const response = await fetch('http://localhost:5050/userpayment/confirm-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });

          const text = await response.text();

          if (!response.ok) {
            throw new Error(JSON.parse(text).message || 'Failed to post payment details');
          }

          setResponseMessage('Payment succeeded and details posted successfully!');
          setErrorMessage('');
          setAmount('');
          setTotalInstallments(1);
          setInstallmentAmount('');
        } catch (error) {
          setErrorMessage(`Error posting payment details: ${error.message}`);
          console.error('Error posting payment details:', error);
        }
      } else {
        setErrorMessage('Payment failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage(`Error confirming payment: ${error.message}`);
      console.error('Error confirming payment:', error);
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
          <label>Total Installments:</label>
          <input
            type="number"
            value={totalInstallments}
            onChange={(e) => setTotalInstallments(e.target.value)}
            required
            min="1"
            step="1"
            placeholder="Number of installments"
          />
        </div>
        <div>
          <label>Installment Amount:</label>
          <input
            type="number"
            value={installmentAmount}
            onChange={(e) => setInstallmentAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
            placeholder="Amount per installment"
          />
        </div>
        <div>
          <label>Card Details:</label>
          <CardElement />
        </div>
        <button type="submit" disabled={loading || !stripe || !elements}>
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default PaymentForm;
