import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PropertyPhotos = () => {
  const { id } = useParams()
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosResponse = await fetch(`http://localhost:5050/property/${id}/photos`);
        if (!photosResponse.ok) {
          throw new Error('Failed to fetch photos');
        }
        const photosData = await photosResponse.json();
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching property and photos:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [id]); // Add id as a dependency to refetch if it changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Property Photos</h2>
      {photos.length > 0 ? (
        <ul>
          {photos.map((photo, index) => (
            <li key={photo.id}>
              <img src={photo.photo_url} alt={`Photo ${photo.id}`} width="200" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No photos available</p>
      )}
    </div>
  );
};

export default PropertyPhotos;
