import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Property.css';
import PhotosComponent from './PhotosComponent';
import { useRefresh } from './RefreshContext';

const PropertyList = ({ userId }) => {
  const { refresh } = useRefresh();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5050/property/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProperties(data);
        setError(null); // Clear previous errors
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error fetching properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [refresh]); 

  const handleLike = async (propertyId) => {
    try {
      const response = await fetch('http://localhost:5050/savedproperties/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          user_id: userId,
          property_id: propertyId,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error saving property: ${response.status} ${response.statusText} ${errorText}`);
        throw new Error('Network response was not ok');
      }
      
      alert('Property saved successfully!');
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property');
    }
  };

  if (loading) return <p>Loading... Thank you for your patience!</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="property-list">
      <Link to='/favourites-page'>Saved </Link>
      <h1>Properties</h1>
      <div className="property-list__cards">
        {properties.length > 0 ? properties.map(property => (
          <div key={property.id} className="property-list__card">
            <div className={`property-photo-container ${property.listing_status === 'Sold' ? 'sold' : ''}`}>
              <PhotosComponent id={property.id} />
              {property.listing_status === 'Sold' && <span className="sold-overlay">Sold</span>}
            </div>
            <div className="property-list__card-content">
              <h2>Address: {property.address}</h2>
              <p>{property.property_type}</p>
              <p>🗺️ {property.city}</p>
              <p>${property.price}</p>
              <p>{property.listing_status}</p>
              <p>{property.photos && property.photos.map(photo => photo.photo_url).join(', ')}</p>
              <div className='property-actions'>
                <button className='like-button' onClick={() => handleLike(property.id)}>
                  ❤️ Like
                </button>
              </div>
              <Link to={`/property/${property.id}`}>View Details</Link>
            </div>
          </div>
        )) : <p>No properties available.</p>}
      </div>
    </div>
  );
};

export default PropertyList;
