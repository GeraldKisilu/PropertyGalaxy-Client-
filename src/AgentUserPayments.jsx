import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AgentUserPayments.css';  // Add your CSS styles

const AgentUserPayments = () => {
    const { propertyId } = useParams(); // Extract propertyId from URL parameters
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch payments from the API
        const fetchPayments = async () => {
            try {
                // Replace with your API endpoint and authentication token
                const response = await fetch(`http://localhost:5050/api/userpayment/agent/${propertyId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Use token for authentication
                        'X-Agent-ID': localStorage.getItem('agentId')  // Or other method of agent identification
                    }
                });
                
                if (response.status === 401) { // Unauthorized
                    navigate('/not-authorized');
                    return;
                }
                
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }

                const data = await response.json();
                setPayments(data.payments);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [propertyId]);  // Dependency array includes propertyId

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="agent-payments">
            <h2>Your Payments for Property ID {propertyId}</h2>
        
            {payments.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Property ID</th>
                            <th>Installment Amount</th>
                            <th>Total Installments</th>
                            <th>Payment Status</th>
                            <th>User Name</th>
                            <th>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>${payment.amount.toFixed(2)}</td>
                                <td>{payment.property}</td>
                                <td>${payment.installment_amount.toFixed(2)}</td>
                                <td>{payment.total_installments}</td>
                                <td>{payment.payment_status}</td>
                                <td>{payment.full_name}</td>
                                <td>{payment.user_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No payments found.</p>
            )}
        </div>
    );
};

export default AgentUserPayments;
