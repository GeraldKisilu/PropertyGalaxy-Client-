import React, { useState } from 'react';
import './AddPhotos.css';  // Import the CSS file

const AddPhotos = ({ propertyId }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      photo_url: photoUrl,
      property_id: propertyId,
    };
    console.log(propertyId);
    try {
      const response = await fetch('http://127.0.0.1:5050/api/photo/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setMessage(result.message || 'Photo added successfully');
      setTimeout(() => {
        setMessage('');
      }, 5000);
      setPhotoUrl('');
    } catch (error) {
      setMessage('Error adding photo');
      console.error(error);
    }
  };

  return (
    <div className="add-photos">
      <h2 className="photos-heading">Add Photo</h2>
      <form onSubmit={handleSubmit} className="photos-form">
        <div className="photos-form-group">
          <label htmlFor="photoUrl" className="photos-form-label">Photo URL:</label>
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="photos-form-input"
            required
          />
        </div>
        <button type="submit" className="photos-form-submit">Add Photo</button>
      </form>
      {message && <p className={message.includes('Error') ? 'photos-error' : 'photos-success'}>{message}</p>}
    </div>
  );
};

export default AddPhotos;
