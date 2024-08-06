import React, { useState } from 'react';

const ReviewForm = ({ propertyId, authToken }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5050/reviews/gotten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                  },
                body: JSON.stringify({
                    property_id: propertyId,
                    rating: rating,
                    comment: comment,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            const data = await response.json();
            setSuccessMessage(data.message);
            setRating(1); // Reset rating
            setComment(''); // Reset comment
        } catch (err) {
            console.error(err);
            setError('Error submitting review');
        }
    };

    return (
        <div>
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating (1-5):</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Review</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
};

export default ReviewForm;
