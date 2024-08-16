import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRefresh } from './RefreshContext';
import BoostButton from './BoostButton';
import Notification from './Notification'; // Import Notification component
import './AgentProperties.css';

function AgentProperty({ property, onRefresh }) {
  const { triggerRefresh } = useRefresh();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(property.price);
  const [boostedProperties, setBoostedProperties] = useState([]);
  const [notification, setNotification] = useState(null); // State for notification

  useEffect(() => {
    fetchBoostedProperties();
  }, []);

  const fetchBoostedProperties = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5050/api/boost/properties');
      const data = await response.json();
      setBoostedProperties(data);
    } catch (error) {
      console.error("There was an error fetching boosted properties:", error);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUpdateProperty = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5050/api/property/${property.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ price }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          alert('Access denied');
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await response.json();
      setIsEditing(false);
      onRefresh();
      triggerRefresh();
    } catch (error) {
      console.error(error);
      alert('Error updating property');
    }
  };

  const handleCancelEdit = () => {
    setPrice(property.price);
    setIsEditing(false);
  };

  const handleDeleteProperty = async () => {
    if (window.confirm(`Are you sure you want to delete property at "${property.address}"?`)) {
      try {
        const response = await fetch(`http://127.0.0.1:5050/api/property/${property.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            alert('Access Denied');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        await response.json();
        onRefresh();
        triggerRefresh();
      } catch (error) {
        console.error(error);
        alert('Error deleting property');
      }
    }
  };

  const handlePurchaseRequests = () => {
    navigate(`/purchase-requests/${property.id}`);
  };

  const handleViewUserPayments = () => {
    navigate(`/user-payments/${property.id}`);
  };

  const onBoost = (city, price, image) => {
    setNotification({ city, price, image }); // Set notification with city, price, and image
  };

  const handleCloseNotification = () => {
    setNotification(null); // Close the notification
  };

  return (
    <div className='card-list'>
      {notification && (
        <Notification 
          city={notification.city} 
          price={notification.price} 
          image={notification.image}
          onClose={handleCloseNotification} 
        />
      )}
      <div className="card">
        <div className="card-body">
          {isEditing ? (
            <textarea
              value={price}
              onChange={handlePriceChange}
              className="form-control"
            />
          ) : (
            <p className="card-text">{property.id}</p>
          )}

          <p className="card-text">Property ID: {property.id}</p>
          <p className="card-text">Address: {property.address}</p>
          <p className="card-text">City: {property.city}</p>
          <p className="card-text">Square Footage: {property.square_footage}</p>
          <p className="card-text">Price: {property.price}</p>
          <p className="card-text">Property Type: {property.property_type}</p>
          <p className="card-text">Listing Status: {property.listing_status}</p>

          <Link to={`/property/${property.id}/photos`}>View Property Photos</Link>

          {isEditing ? (
            <div>
              <button className='card-btn save-btn' onClick={handleUpdateProperty}>Save</button>
              <button className='card-btn cancel-btn' onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <button className='card-btn edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
              <button className='card-btn delete-btn' onClick={handleDeleteProperty}>Delete</button>
            </div>
          )}

          <BoostButton 
            propertyId={property.id} 
            propertyCity={property.city} 
            propertyPrice={property.price} 
            propertyImage={property.imageUrl} 
            onBoostSuccess={onBoost} 
          />
          
          <button className='request-btn' onClick={handlePurchaseRequests}>
            Purchase Requests
          </button>

          <button className = 'request-btn' onClick={handleViewUserPayments}>
            View User Payments
          </button>
        </div>

        {/* Boosted Properties Section */}
        <section className="boosted-properties">
          <h2>Boosted Properties</h2>
          <div className="boosted-properties-grid">
            {boostedProperties.map(property => (
              <div className="boosted-property-item" key={property.id}>
               
                <p className="legend">{property.address}</p>
                <p>City: {property.city}</p>
                <p>Price: ${property.price}</p>
                <BoostButton 
                  propertyId={property.id} 
                  propertyCity={property.city} 
                  propertyPrice={property.price} 
                  propertyImage={property.imageUrl} 
                  onBoostSuccess={onBoost} 
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AgentProperty;
