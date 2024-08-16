import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PurchaseRequestForm from './PurchaseRequestForm';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [features, setFeatures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fade, setFade] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property details
        const propertyResponse = await fetch(`http://localhost:5050/api/property/${id}`);
        if (!propertyResponse.ok) {
          throw new Error('Failed to fetch property details');
        }
        const propertyData = await propertyResponse.json();
        setProperty(propertyData);

        // Fetch property photos
        const photosResponse = await fetch(`http://localhost:5050/api/property/${id}/photos`);
        if (!photosResponse.ok) {
          throw new Error('Failed to fetch photos');
        }
        const photosData = await photosResponse.json();
        setPhotos(photosData);

        // Fetch property features
        const featureResponse = await fetch(`http://localhost:5050/api/features/${id}`);
        if (featureResponse.status === 401) { // Unauthorized
          navigate('/not-authorized');
          return;
        }
        if (!featureResponse.ok) {
          throw new Error('Failed to fetch features');
        }
        const featuresData = await featureResponse.json();
        setFeatures(featuresData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching property data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setFade(false);
    }, 300); // Duration of fade-out
  };

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
      setFade(false);
    }, 300); // Duration of fade-out
  };

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
      {photos.length > 0 ? (
        <div>
          <div className={`photo-container ${fade ? 'fade-out' : 'fade-in'}`}>
            <img
              src={photos[currentIndex].photo_url}
              alt={`Photo ${currentIndex + 1}`}
              className="photo-image"
            />
          </div>
          <div className="photo-navigation">
            <button onClick={handlePrev} disabled={photos.length <= 1}>
              &lt;
            </button>
            <span>
              {currentIndex + 1} / {photos.length}
            </span>
            <button onClick={handleNext} disabled={photos.length <= 1}>
              &gt;
            </button>
          </div>
        </div>
      ) : (
        <p className="property-no-photos">No photos available.</p>
      )}

      <h2 className="property-features-header">Features</h2>
      <ul className="property-features">
        {features.length > 0 ? (
          features.map(feature => (
            <li className = 'property-info' key={feature.id} >
              <strong>{feature.name}</strong>: {feature.description}
            </li>
          ))
        ) : (
          <p className="property-no-features">No features available</p>
        )}
      </ul>

     
      <Link to={`/contact/?property_id=${property.id}&agent_id=${property.agent_id}`} className="property-contact-link">
        Contact Agent
      </Link>
      
      <PurchaseRequestForm propertyId={property.id} />
    </div>
  );
};

export default PropertyDetails;
