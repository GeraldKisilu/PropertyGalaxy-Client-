import React, { useEffect } from 'react';

const Notification = ({ city, price, image, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the notification after 5 minutes
    }, 300000); // 5 minutes in milliseconds

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
    <div className="notification">
      <div className="notification-content">
        <img src={image} alt={city} className="notification-image" />
        <h4>Boosted Property Alert!</h4>
        <p>City: {city}</p>
        <p>Price: ${price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Notification;
