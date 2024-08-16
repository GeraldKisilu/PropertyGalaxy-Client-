import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

function FavoritesPage() {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Import useNavigate for navigation

  useEffect(() => {
    const fetchSavedProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5050/savedproperties/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

        if (response.status === 401) { // Unauthorized
          navigate('/not-authorized');
          return;
        }

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
  }, [navigate]);

  if (loading) return <div className="favorites-loading">Loading...</div>;
  if (error) return <div className="favorites-error">{error}</div>;

  return (
    <div className="favorites-page">
      <h1 className="favorites-header">Your Favorite Properties</h1>
      {savedProperties.length === 0 ? (
        <p className="favorites-empty">You have no favorite properties yet.</p>
      ) : (
        <ul className="favorites-list">
          {savedProperties.map((property) => (
            <li key={property.property_id} className="favorites-item">
              <Link to={`/property/${property.property_id}`} className="favorites-link">
                {property.property.address}, {property.property.city} - ${property.property.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
