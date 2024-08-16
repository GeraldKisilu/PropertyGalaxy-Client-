import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import './PropertySearch.css'; // Import the CSS file

const PropertySearch = () => {
    const { location } = useParams(); // Get location from the URL
    const [properties, setProperties] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (location) {
            handleSearch(location);
        }
    }, [location]);

    const handleSearch = async (location) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/property/city/${encodeURIComponent(location)}`);
            if (response.ok) {
                const propertiesData = await response.json();
                setProperties(propertiesData);
                const uniqueCities = [...new Set(propertiesData.map(prop => prop.city))];
                setSuggestions(uniqueCities);
            } else {
                console.error('Failed to fetch properties');
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const renderProperties = () => {
        const categorizedProperties = properties.reduce((acc, property) => {
            if (!acc[property.city]) {
                acc[property.city] = [];
            }
            acc[property.city].push(property);
            return acc;
        }, {});

        return Object.keys(categorizedProperties).map(city => (
            <div key={city} className="property-city-section">
                <h2 className="property-city-title">{city}</h2>
                <ul className="property-list">
                    {categorizedProperties[city].map(property => (
                         <Link 
                         to={`/property/${property.id}`}
                         className="property-card-unique property-card-hover-unique"
                         key={property.id}
                     >
                        <li key={property.id}>
                            <div className="property-item">
                           
                                <div className="property-details">
                                    <h3>{property.address}</h3>
                                    <p>Price: ${property.price}</p>
                                    <p>Type: {property.property_type}</p>
                                </div>
                               
                            </div>
                        </li>
                        </Link>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="property-search-container">
            <h3>Properties in {location}</h3>
            {renderProperties()}
        </div>
    );
};

export default PropertySearch;
