import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import PurchaseRequestForm from './PurchaseRequestForm';
import './PropertyDetails.css'; 

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property details
        const propertyResponse = await fetch(`http://localhost:5050/property/${id}`);
        if (!propertyResponse.ok) {
          throw new Error('Failed to fetch property details');
        }
        const propertyData = await propertyResponse.json();
        setProperty(propertyData);

        // Fetch property photos
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

  if (loading) return <p className="property-loading">Loading...</p>;
  if (error) return <p className="property-error">{error}</p>;
  if (!property) return <p className="property-not-found">No property found</p>;

  return (
    <div className="property-details">
      <h1 className="property-address">{property.address}</h1>
      <p className="property-info">City: {property.city}</p>
      <p className="property-info">Square Footage: {property.square_footage}</p>
      <p className="property-info">Price: ${property.price}</p>
      <p className="property-info">Type: {property.property_type}</p>
      <p className="property-info">Status: {property.listing_status}</p>

      <h2 className="property-photos-header">Photos</h2>
      <div className="property-photos">
        {photos.length > 0 ? (
          photos.map(photo => (
            <div key={photo.id} className="property-photo-item">
              <img 
                src={photo.photo_url} 
                alt={`Photo ${photo.id}`} 
                className="property-photo" 
              />
            </div>
          ))
        ) : (
          <p className="property-no-photos">No photos available</p>
        )}
      </div>
      <h2 className='contact-agent'>Contact Agent</h2>

      <Link to={`/contact/?property_id=${property.id}&agent_id=${property.agent_id}`} className="property-contact-link">
        Contact Agent
      </Link>
      
      <PurchaseRequestForm propertyId={property.id} />
    </div>
  );
};

export default PropertyDetails;
