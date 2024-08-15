// PaymentForm.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';


// Make sure to replace with your own public key
// const stripePromise = loadStripe('pk_test_51PloPVHNjTG5ppcijzxnmDzRSYybNFys5Zf7pzgR8QwGxIP6s9aUb5cygPgSV8ZQQAY6iMZ2KRuCYVRpI7QGJN7z00rqUJuYtj');

const AgentPaymentForm = ({ listingFeeId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const applicationId = searchParams.get('applicationId')

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // Call your backend to create a PaymentIntent
    const response = await fetch(`http://127.0.0.1:5050/listingfee/${listingFeeId}/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agent_id: userId,
        application_id :applicationId
      }),
    });
    
    const { client_secret, message } = await response.json();

    if (response.ok) {
      // Confirm the PaymentIntent with the client secret
      const { error: stripeError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        // Payment succeeded
        alert('Payment successful!');
      }
    } else {
      // Handle server errors
      setError(message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Pay for Listing Fee</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
export default AgentPaymentForm;