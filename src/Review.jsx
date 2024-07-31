import React, { useState } from 'react';
import './Review.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([
        { id: 1, username: 'Ahmed Mohammed', comment: 'Great service and very helpful agents!' },
        { id: 2, username: 'Mercy Oroo', comment: 'Found my dream home thanks to this site!' },
        { id: 3, username: 'GeraldKisilu', comment: 'A fantastic platform for connecting buyers and sellers.' },
        { id: 3, username: 'SuzanneAmanda', comment: 'Best realtors, perfect for the job .' }
    ]);
    
    const [newReview, setNewReview] = useState('');
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);

    const handleReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newReview && username && rating) {
            const newReviewEntry = {
                id: reviews.length + 1,
                username,
                comment: newReview,
                rating,
            };
            setReviews([...reviews, newReviewEntry]);
            setNewReview('');
            setUsername('');
            setRating(0);
        }
    };

    return (
        <div className="review-page">
            <h2>User Reviews</h2>
            <div className="review-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <strong>{review.username}</strong>
                        <div className="rating">
                            {[...Array(review.rating)].map((_, i) => (
                                <span key={i} className="star">⭐</span>
                            ))}
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
            <h3>Leave a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="Your Review"
                        value={newReview}
                        onChange={handleReviewChange}
                        required
                    />
                </div>
                <div className="form-group rating">
                    <label>Rating:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${rating >= star ? 'selected' : ''}`}
                            onClick={() => handleRatingChange(star)}
                        >
                            ⭐
                        </span>
                    ))}
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewPage;
