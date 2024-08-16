import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleReview from './SingleReview';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh);
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get('http://127.0.0.1:5050/api/reviews/gotten'); 
        setReviews(response.data.reviews || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setLoading(false);
      }
    }

    fetchReviews();
  }, [reviews.id]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="review-list">
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.user_id} className="review-item">
              <SingleReview review={review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReviewList;
