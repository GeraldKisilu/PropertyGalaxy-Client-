import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AgentProperty({ property }) {
  const navigate = useNavigate(); // Fix useNavigate usage
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(property.address);
  const [description, setDescription] = useState(property.description);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Commented out CRUD operations
  /*
  const handleUpdateProperty = () => {
    fetch(`http://127.0.0.1:5555/property/${property.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        address,
        description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            alert('Access denied');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCancelEdit = () => {
    setAddress(property.address);
    setDescription(property.description);
    setIsEditing(false);
  };

  const handleDeleteProperty = () => {
    if (window.confirm(`Are you sure you want to delete property at "${property.address}"?`)) {
      fetch(`http://127.0.0.1:5555/property/${property.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 403) {
              alert('Access Denied');
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          // Handle successful deletion, e.g., refresh the list
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  */

  const handlePurchaseRequests = () => {
    navigate(`/purchase-requests/${property.id}`);
  };

  return (
    <div className='card-list'>
      <div className="card">
        <div className="card-body">
          {/* Uncomment and update if needed */}
          {/* <img src={property.image || 'https://via.placeholder.com/150'} alt="Property" className="card-img-top" /> */}
          {/* {isEditing ? (
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              className="form-control"
            />
          ) : (
            <h5 className="card-title">{property.address}</h5>
          )} */}
          {/* {isEditing ? (
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="form-control"
            />
          ) : (
            <p className="card-text">{description}</p>
          )} */}
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
              {/* <button className='card-btn save-btn' onClick={handleUpdateProperty}>Save</button>
              <button className='card-btn cancel-btn' onClick={handleCancelEdit}>Cancel</button> */}
            </div>
          ) : (
            <div>
              {/* <button className='card-btn edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
              <button className='card-btn delete-btn' onClick={handleDeleteProperty}>Delete</button> */}
            </div>
          )}
        </div>
      </div>
      <button onClick={handlePurchaseRequests}>
        Purchase Requests
      </button>
    </div>
  );
}

export default AgentProperty;
