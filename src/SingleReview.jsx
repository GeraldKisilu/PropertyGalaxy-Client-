import React from 'react';
import './SingleReview.css';

// Define the URL for the default image
const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/150'; // Replace with your default image URL

function SingleReview({ review }) {
  console.log(review);

  // Use default image if review.image_url is not provided
  const imageUrl = review.image || DEFAULT_IMAGE_URL;

  // Function to render star icons based on the rating
  const renderStars = (rating) => {
    const totalStars = 5; // Total number of stars to display
    let stars = '';

    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating) {
        stars += '★'; // Filled star
      } else {
        stars += '☆'; // Empty star
      }
    }

    return stars;
  };

  return (
    <div className="single-review-container">
      <img src={imageUrl} alt="Review" className="review-image" />
      <div className="review-content">
        <p className="rating">
          {renderStars(review.rating)}
        </p>
        <p>
          <span className="review-text">Review Text: {review.comment}</span>
        </p>
        <p>
          <span className="user-id">User: {review.user}</span>
        </p>
      </div>
    </div>
  );
}

export default SingleReview;
