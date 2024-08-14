import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {boostedProperties.map((property, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={property.id}>
              <img src={property.image_url} className="d-block w-100" alt={property.address} />
              <div className="carousel-caption d-none d-md-block">
                <h5>{property.address}, {property.city}</h5>
                <p>${property.price}</p>
                <Link to={`/property/${property.id}`} className="btn btn-primary">
                  View Property
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default BoostedProperties;
