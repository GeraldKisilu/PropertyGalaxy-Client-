import React, { useState } from 'react';
import './AddFeatureComponent.css';  // Import the CSS file

const AddFeatureComponent = ({ propertyId }) => {
  const [featureName, setFeatureName] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featureData = {
      name: featureName,
      description: featureDescription,
      property_id: propertyId
    };
    console.log(propertyId);

    try {
      const response = await fetch('https://phase-5-group-project-backend-24.onrender.com/features/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(featureData),
      });

      if (!response.ok) {
        throw new Error('Failed to add feature');
      }

      const data = await response.json();
      setResponseMessage(data.message);
      setErrorMessage('');
      setFeatureName('');
      setFeatureDescription('');
    } catch (error) {
      console.error('Error adding feature:', error);
      setErrorMessage('Error adding feature. Please try again.');
      setResponseMessage('');
    }
  };

  return (
    <div className="add-feature">
      <h2 className="feature-heading">Add a New Feature</h2>
      <form onSubmit={handleSubmit} className="feature-form">
        <div className="feature-form-group">
          <label htmlFor="featureName" className="feature-form-label">Feature Name:</label>
          <input
            type="text"
            id="featureName"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
            className="feature-form-input"
            required
          />
        </div>
        <div className="feature-form-group">
          <label htmlFor="featureDescription" className="feature-form-label">Feature Description:</label>
          <textarea
            id="featureDescription"
            value={featureDescription}
            onChange={(e) => setFeatureDescription(e.target.value)}
            className="feature-form-textarea"
            required
          />
        </div>
        <button type="submit" className="feature-form-submit">Submit</button>
      </form>
      {responseMessage && <p className="feature-success">{responseMessage}</p>}
      {errorMessage && <p className="feature-error">{errorMessage}</p>}
    </div>
  );
};

export default AddFeatureComponent;
