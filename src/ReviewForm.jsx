import React, { useState } from 'react';

const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
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
                    
                    rating: rating,
                    comment: comment,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();  
                throw new Error(`Failed to submit review: ${errorText}`);
            }

            const data = await response.json();
            setSuccessMessage(data.message);
            setRating(0); 
            setComment('');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Submit a Review</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating:</label>
                    <div style={{ display: 'inline-block' }}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <span
                                key={index}
                                className={`star ${index <= (hoverRating || rating) ? 'filled' : ''}`}
                                onMouseEnter={() => setHoverRating(index)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(index)}
                                style={{ cursor: 'pointer', fontSize: '2rem', color: index <= (hoverRating || rating) ? 'yellow' : 'gray' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
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
