import React, { useState, useEffect } from 'react';

const BoostedProperties = () => {
  const [boostedProperties, setBoostedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoostedProperties = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5050/boost/properties');

        if (!response.ok) {
          throw new Error('Failed to fetch boosted properties');
        }

        const data = await response.json();
        setBoostedProperties(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoostedProperties();
  }, []);

  if (loading) return <p>Loading boosted properties...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Boosted Properties</h2>
      <ul>
        {boostedProperties.map(property => (
          <li key={property.id}>
            <p>Address: {property.address}</p>
            <p>City: {property.city}</p>
            <p>Price: ${property.price}</p>
            <p>Square Footage: {property.square_footage} sq ft</p>
            <p>Property Type: {property.property_type}</p>
            <p>Listing Status: {property.listing_status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoostedProperties;
