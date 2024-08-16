// src/components/FeaturedProperties.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5050/property/list');
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        setProperties(data.slice(0, 4)); // Fetch only the first 4 properties
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading featured properties...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="featured-properties">
      <h2>Featured Properties</h2>
      <div className="featured-properties-grid">
        {properties.length > 0 ? (
          properties.map(property => (
            <div className="featured-property-item" key={property.id}>
              <Link to={`/property/${property.id}`} className="featured-property-link">
                <img src={property.image_url} alt={property.address} className="featured-property-image" />
                <div className="featured-property-details">
                  <h3>{property.address}</h3>
                  <p>${property.price}</p>
                  <p>{property.property_type}</p>
                  <p>{property.city}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No featured properties available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
