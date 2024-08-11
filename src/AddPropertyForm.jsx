import React, { useState } from 'react';
import axios from 'axios';
import AddPhotos from './AddPhotos';
import AddFeatureComponent from './AddFeatureComponents';

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    square_footage: '',
    price: '',
    property_type: '',
    listing_status: '',
   
  });
  const [propertyId, setPropertyId] = useState(null); // State to store property ID
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Reset success message before new submission

    try {
      const response = await axios.post('http://127.0.0.1:5050/property/list', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { property_id } = response.data; // Assuming the response contains the new property's ID
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
    <div>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Square Footage:</label>
          <input
            type="number"
            name="square_footage"
            value={formData.square_footage}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Property Type:</label>
          <input
            type="text"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Listing Status:</label>
          <input
            type="text"
            name="listing_status"
            value={formData.listing_status}
            onChange={handleChange}
            required
          />
        </div>
       
        <button type="submit">Add Property</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
      {propertyId && (
        <div>
           <AddPhotos propertyId={propertyId} />
           <AddFeatureComponent propertyId  = {propertyId}/>
        </div>
      )}
    </div>
  );
};

export default AddPropertyForm;
