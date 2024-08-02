import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  property details
        const propertyResponse = await axios.get(`http://localhost:5050/property/${id}`);
        setProperty(propertyResponse.data);

        //  photos of the property
        const photosResponse = await axios.get(`http://localhost:5050/photo/${id}`);
        setPhotos(photosResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property and photos:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>No property found</p>;

  return (
    <div>
      <h1>{property.property}</h1>
      <p>Address: {property.address}</p>
      <p>City: {property.city}</p>
      <p>Square Footage: {property.square_footage}</p>
      <p>Price: ${property.price}</p>
      <p>Type: {property.property_type}</p>
      <p>Status: {property.listing_status}</p>
      <p>Rooms: {property.rooms}</p>
      
      <h2>Photos</h2>
      <div>
        {photos.length > 0 ? (
          photos.map(photo => (
            <div key={photo.id}>
              <img src={photo.photo_url} alt={`Photo ${photo.id}`} style={{ width: '100%', maxWidth: '400px', marginBottom: '10px' }} />
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
