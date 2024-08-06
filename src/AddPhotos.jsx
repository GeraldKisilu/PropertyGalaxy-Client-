import React, { useState } from 'react';

const AddPhotos = ({ propertyId }) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      photo_url: photoUrl,
      property_id: propertyId,
    };
   console.log(propertyId)
    try {
      const response = await fetch('http://127.0.0.1:5050/photo/list', {
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
    <div>
      <h2>Add Photo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="photoUrl">Photo URL:</label>
          <input
            type="text"
            id="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Photo</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPhotos;
