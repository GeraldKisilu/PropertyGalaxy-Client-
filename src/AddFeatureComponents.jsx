import React, { useState } from 'react';

const AddFeatureComponent = ({propertyId}) => {
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
    console.log(propertyId)

    try {
      const response = await fetch('http://localhost:5050/features/list', {
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
    <div>
      <h2>Add a New Feature</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Feature Name:</label>
          <input
            type="text"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Feature Description:</label>
          <textarea
            value={featureDescription}
            onChange={(e) => setFeatureDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AddFeatureComponent;
