import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';


const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await fetch(`http://localhost:5050/property/${id}`);
        if (!propertyResponse.ok) {
          throw new Error('Failed to fetch property details');
        }
        const propertyData = await propertyResponse.json();
        setProperty(propertyData);

        const photosResponse = await fetch(`http://localhost:5050/property/${id}/photos`);
        if (!photosResponse.ok) {
          throw new Error('Failed to fetch photos');
        }
        const photosData = await photosResponse.json();
        setPhotos(photosData);

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
      <h1>{property.address}</h1>
      <p>City: {property.city}</p>
      <p>Square Footage: {property.square_footage}</p>
      <p>Price: ${property.price}</p>
      <p>Type: {property.property_type}</p>
      <p>Status: {property.listing_status}</p>
     
      
      
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
      <Link to = {`/contact/?property_id=${property.id}&agent_id=${property.agent_id}`}>Contact Agent</Link>
    </div>
  );
};

export default PropertyDetails;