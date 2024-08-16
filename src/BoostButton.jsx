import React, { useState } from 'react';

const BoostButton = ({ propertyId, propertyCity, propertyPrice, propertyImage, onBoostSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBoost = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:5050/api/boost/property', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ property_id: propertyId })
      });

      if (!response.ok) {
        throw new Error('Failed to boost the property');
      }

      setSuccess(true);
      onBoostSuccess(propertyCity, propertyPrice, propertyImage); // Pass necessary details to parent
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleBoost} disabled={loading}>
        {loading ? 'Boosting...' : 'Boost'}
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Property boosted successfully!</p>}
    </div>
  );
};

export default BoostButton;
