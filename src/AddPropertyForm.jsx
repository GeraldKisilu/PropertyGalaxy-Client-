import React, { useState } from 'react';
import axios from 'axios';
import AddPhotos from './AddPhotos';
import AddFeatureComponent from './AddFeatureComponents';
import './AddPropertyForm.css';  // Import the CSS file

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    square_footage: '',
    price: '',
    property_type: '',
    listing_status: '',
  });
  const [propertyId, setPropertyId] = useState(null); 
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); 

    try {
      const response = await axios.post('https://phase-5-group-project-backend-24.onrender.com/property/list', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { property_id } = response.data; 
      setPropertyId(property_id);
      setSuccessMessage('Property added successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      setFormData({
        address: '',
        city: '',
        square_footage: '',
        price: '',
        property_type: '',
        listing_status: '',
      });
    } catch (err) {
      setError('Failed to add property. Please try again.');
      console.error(err); 

      setTimeout(() => {
        setError('');
      }, 5000); 
    }
  };

  return (
    <div className="add-property-form">
      <h2 className="form-heading">Add New Property</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Square Footage:</label>
          <input
            type="number"
            name="square_footage"
            value={formData.square_footage}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Property Type:</label>
          <input
            type="text"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Listing Status:</label>
          <input
            type="text"
            name="listing_status"
            value={formData.listing_status}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
       
        <button type="submit" className="form-submit">Add Property</button>
        {error && <p className="form-error">{error}</p>}
        {successMessage && <p className="form-success">{successMessage}</p>}
      </form>
      {propertyId && (
        <div>
          <AddPhotos propertyId={propertyId} />
          <AddFeatureComponent propertyId={propertyId} />
        </div>
      )}
    </div>
  );
};

export default AddPropertyForm;
