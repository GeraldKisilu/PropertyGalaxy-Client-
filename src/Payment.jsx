import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PloPVHNjTG5ppcijzxnmDzRSYybNFys5Zf7pzgR8QwGxIP6s9aUb5cygPgSV8ZQQAY6iMZ2KRuCYVRpI7QGJN7z00rqUJuYtj'); // Replace with your Stripe publishable key

const PaymentForm = ({ feeId, onPaymentSuccess, onPaymentFailure }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return; // Make sure to disable the button if Stripe.js has not loaded

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // Call your backend to create a PaymentIntent
            const response = await fetch(`http://localhost:5050/listingfee/${feeId}/pay`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Failed to create PaymentIntent');
            }

            const { client_secret } = await response.json();

            // Confirm the payment with the card details
            const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (error) {
                setErrorMessage(`Payment failed: ${error.message}`);
                onPaymentFailure && onPaymentFailure(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                onPaymentSuccess && onPaymentSuccess();
            }
        } catch (err) {
            setErrorMessage(`Payment failed: ${err.message}`);
            onPaymentFailure && onPaymentFailure(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Make a Payment</h2>
            <CardElement options={{ hidePostalCode: true }} />
            <button type="submit" disabled={!stripe || isProcessing}>
                {isProcessing ? 'Processing...' : 'Pay'}
            </button>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </form>
    );
};

const Payment = ({ feeId }) => {
    const handlePaymentSuccess = () => {
        alert('Payment successful!');
    };

    const handlePaymentFailure = (message) => {
        alert(`Payment failed: ${message}`);
    };

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm feeId={feeId} onPaymentSuccess={handlePaymentSuccess} onPaymentFailure={handlePaymentFailure} />
        </Elements>
    );
};

export default Payment;