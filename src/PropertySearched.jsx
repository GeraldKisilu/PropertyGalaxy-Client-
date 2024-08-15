import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PropertySearched() {
    const { city } = useParams(); // Get the city parameter from the URL
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5050/property/city/${city}`)
            .then(response => response.json())
            .then(data => setProperties(data))
            .catch(error => console.error("There was an error fetching the properties:", error));
    }, [city]);

    return (
        <div>
            <h1>Properties in {city}</h1>
            <div className="properties-list">
                {properties.length === 0 ? (
                    <p>No properties found for {city}</p>
                ) : (
                    properties.map(property => (
                        <div className="property-item" key={property.id}>
                            <h2>{property.address}</h2>
                            <p>Price: ${property.price}</p>
                            <p>Square Footage: {property.square_footage} sqft</p>
                            <p>Type: {property.property_type}</p>
                            <p>Status: {property.listing_status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PropertySearched;
