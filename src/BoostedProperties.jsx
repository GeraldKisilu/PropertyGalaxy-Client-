import React, { useEffect, useState } from 'react';

const BoostedProperties = () => {
    const [boostedProperties, setBoostedProperties] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoostedProperties = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5050/property/boosted');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBoostedProperties(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBoostedProperties();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Boosted Properties</h2>
            {boostedProperties.length === 0 ? (
                <p>No boosted properties available.</p>
            ) : (
                <ul>
                    {boostedProperties.map(property => (
                        <li key={property.id}>
                            {property.address}, {property.city} - ${property.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BoostedProperties;
