import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './PaymentForm.css'; // Import your CSS file

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

  const [paymentType, setPaymentType] = useState('installments');
  const [totalInstallments, setTotalInstallments] = useState(3);
  const [installmentAmount, setInstallmentAmount] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5050/userpayment/property-details/${propertyId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch property details');
        }

        setAmount(data.price);
      } catch (error) {
        setErrorMessage(`Error fetching property details: ${error.message}`);
        console.error('Error fetching property details:', error.message);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  useEffect(() => {
    const calculateInstallmentAmount = () => {
      if (amount && totalInstallments > 0) {
        const amountPerInstallment = parseFloat(amount) / totalInstallments;
        setInstallmentAmount(amountPerInstallment.toFixed(2));
      }
    };

    const fetchClientSecret = async () => {
      if (amount && propertyId && userId && installmentAmount) {
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
              total_installments: paymentType === 'installments' ? totalInstallments : 1,
              installment_amount: paymentType === 'installments' ? parseFloat(installmentAmount) : null,
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
      }
    };

    calculateInstallmentAmount();
    fetchClientSecret();
  }, [amount, propertyId, userId, paymentType, totalInstallments, installmentAmount]);

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
        const paymentData = {
          amount: parseFloat(amount),
          property_id: propertyId,
          user_id: userId,
          payment_intent_id: paymentIntent.id,
          total_installments: paymentType === 'installments' ? totalInstallments : 1,
          installment_amount: paymentType === 'installments' ? parseFloat(installmentAmount) : null,
        };

        const endpoint = paymentType === 'installments' ? 'confirm-payment' : 'full-payment';

        const response = await fetch(`http://localhost:5050/userpayment/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Failed to post payment details');
        }

        setResponseMessage('Payment succeeded and details posted successfully!');
        setErrorMessage('');
        setAmount('');
        setInstallmentAmount('');
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
    <div className="agent-application-form">
      <h2 className="form-heading">Submit Payment</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Payment Type:</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="form-input"
          >
            <option value="installments">Installments</option>
            {/* Add more payment types if needed */}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            value={amount}
            readOnly
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            className="form-input"
          />
        </div>
        {paymentType === 'installments' && (
          <>
            <div className="form-group">
              <label className="form-label">Total Installments:</label>
              <input
                type="number"
                value={totalInstallments}
                onChange={(e) => setTotalInstallments(parseInt(e.target.value, 10) || 1)}
                min="1"
                step="1"
                placeholder="Number of installments"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Installment Amount:</label>
              <input
                type="number"
                value={installmentAmount}
                readOnly
                min="0.01"
                step="0.01"
                placeholder="Amount per installment"
                className="form-input"
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label className="form-label">Card Details:</label>
          <CardElement className="form-input" />
        </div>
        <button
          type="submit"
          disabled={loading || !stripe || !elements}
          className="form-submit"
        >
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
        {responseMessage && <p className="form-success">{responseMessage}</p>}
        {errorMessage && <p className="form-error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
