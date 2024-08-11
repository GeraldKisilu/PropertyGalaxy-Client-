import React, { useEffect, useState } from 'react';

const ListingFee = ({ feeId }) => {
    const [fee, setFee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFee = async () => {
            try {
                const response = await fetch(`http://localhost:5050/listingfee/${feeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch listing fee');
                }
                const data = await response.json();
                setFee(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFee();
    }, [feeId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!fee) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Listing Fee Details</h2>
            <p>Fee Amount: ${fee.fee_amount}</p>
            <p>Fee Type: {fee.fee_type}</p>
            <p>Start Date: {fee.start_date}</p>
            <p>End Date: {fee.end_date}</p>
            <p>Status: {fee.is_active ? 'Active' : 'Inactive'}</p>
            <p>Payment Frequency: {fee.payment_frequency}</p>
            <p>Subscription Status: {fee.subscription_status}</p>
        </div>
    );
};

export default ListingFee;