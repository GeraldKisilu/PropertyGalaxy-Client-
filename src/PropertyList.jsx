import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5050/property/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error fetching properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="property-list">
      <h1>Properties</h1>
      <div className="property-list__cards">
        {properties.map(property => (
          <div key={property.id} className="property-list__card">
            <div className="property-list__card-content">
              <h2>{property.address}</h2>
              <p>{property.city}</p>
              <p>${property.price}</p>
              <Link to={`/property/${property.id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
