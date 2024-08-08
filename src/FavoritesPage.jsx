import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage({ userId, authToken }) {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5050/savedproperties/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSavedProperties(data);
      } catch (err) {
        setError('Error fetching saved properties');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Favorite Properties</h1>
      <ul>
        {savedProperties.map(property => (
          <li key={property.id}>
            <Link to={`/property/${property.property_id}`}>
              {property.property.address}, {property.property.city} - ${property.property.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
