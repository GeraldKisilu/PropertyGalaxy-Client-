import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

function PropertySearched() {
    const { city } = useParams(); 
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5050/property/city/${city}`)
            .then(response => response.json())
            .then(data => setProperties(data))
            .catch(error => console.error("There was an error fetching the properties:", error));
    }, [city]);

    // Inline CSS styles
    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        textAlign: 'center',
    };

    const cardsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    };

    const cardStyle = {
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        width: '350px',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        margin: '0 auto',
    };

    const cardHoverStyle = {
        transform: 'scale(1.05)',
    };

    const imageStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
    };

    const detailsStyle = {
        padding: '15px',
        textAlign: 'left',
    };

    const addressStyle = {
        fontSize: '20px',
        fontWeight: '600',
        margin: '0 0 10px',
    };

    const textStyle = {
        margin: '0 0 5px',
        fontSize: '16px',
    };

    const statusStyle = {
        fontWeight: 'bold',
        color: '#e74c3c', // Red color for status
    };

    return (
        <div style={containerStyle}>
            <h1>Properties in {city}</h1>
            <div style={cardsContainerStyle}>
                {properties.length === 0 ? (
                    <p>No properties found for {city}</p>
                ) : (
                    properties.map(property => (
                        <div 
                            style={cardStyle}
                            key={property.id}
                            className="property-card"
                            onMouseEnter={e => e.currentTarget.style.transform = cardHoverStyle.transform}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <p>{property.photos && property.photos.map(photo => photo.photo_url).join(', ')}</p>
                            <div style={detailsStyle}>
                                <h2 style={addressStyle}>{property.address}</h2>
                                <p style={textStyle}>Price: ${property.price}</p>
                                <p style={textStyle}>Square Footage: {property.square_footage} sqft</p>
                                <p style={textStyle}>Type: {property.property_type}</p>
                                <p style={{...textStyle, ...statusStyle}}>Status: {property.listing_status}</p>
                                <Link to={`/property/${property.id}`}>View Details</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PropertySearched;