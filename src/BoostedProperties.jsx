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
          <Link to={`/property/${property.property.id}`} className="favorites-link">
          {property.address}, {property.city} - ${property.price}
        </Link>
        ))}
      </ul>
    </div>
  );
};

export default BoostedProperties;
