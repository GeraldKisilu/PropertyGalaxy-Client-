import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesPage.css';

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

  if (loading) return <div className="favorites-loading">Loading...</div>;
  if (error) return <div className="favorites-error">{error}</div>;

  return (
    <div className="favorites-page">
      <h1 className="favorites-header">Your Favorite Properties</h1>
      <ul className="favorites-list">
        {savedProperties.map((property) => (
          <li key={property.id} className="favorites-item">
            <Link to={`/property/${property.property_id}`} className="favorites-link">
              {property.property.address}, {property.property.city} - ${property.property.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
