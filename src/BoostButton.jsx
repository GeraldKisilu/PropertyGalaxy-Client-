import React, { useState } from 'react';

const BoostButton = ({ propertyId, authToken }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBoost = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:5050/boost/property', {
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
