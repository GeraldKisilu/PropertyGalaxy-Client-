import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AgentProperty from './AgentProperties';
import { FaEnvelope, FaPlus } from 'react-icons/fa'; // Importing the envelope and plus icons

function AgentDashboard() {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const handleRefresh = () => {
        setRefresh(prevRefresh => !prevRefresh);
    };

    useEffect(() => {
        const fetchProperties = () => {
            fetch('https://phase-5-group-project-backend-24.onrender.com/property/agents', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => {
                    if (response.status === 401) { // Unauthorized
                        navigate('/not-authorized');
                        return;
                    }
                    if (!response.ok) {
                        throw new Error('Failed to fetch properties');
                    }
                    return response.json();
                })
                .then((data) => {
                    setProperties(data);
                })
                .catch((err) => {
                    setError(err.message);
                });
        };

        fetchProperties();
    }, [refresh, navigate]);

    const handleHomePage = () => {
        navigate('/user-dashboard');
    };

    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
    };

    const headerStyle = {
        marginBottom: '20px',
        fontSize: '2rem',
        color: '#333',
    };

    const linkContainerStyle = {
        marginBottom: '20px',
    };

    const linkStyle = {
        marginRight: '15px',
        textDecoration: 'none',
        color: '#007bff',
        fontSize: '1.1rem',
        display: 'flex',
        alignItems: 'center',
    };

    const iconStyle = {
        marginRight: '8px',
        fontSize: '1.3rem', // Slightly larger icon
    };

    const errorStyle = {
        color: 'red',
        marginTop: '10px',
        fontSize: '1rem',
    };

    const noPropertiesStyle = {
        fontSize: '1.2rem',
        color: '#666',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Agent Dashboard</h1>
            <div style={linkContainerStyle}>
                <Link to='/add-property' style={linkStyle}>
                    <FaPlus style={iconStyle} />
                    Add Property
                </Link>
                <Link to='/agent-messages' style={linkStyle}>
                    <FaEnvelope style={iconStyle} />
                    Agent Messages
                </Link>
            </div>
            {error && <p style={errorStyle}>{error}</p>}
            {properties.length > 0 ? (
                properties.map(property => (
                    <AgentProperty key={property.id} property={property} onRefresh={handleRefresh} />
                ))
            ) : (
                <p style={noPropertiesStyle}>No properties found.</p>
            )}
            <button className='dashboard-button' onClick={handleHomePage}>
                🏠︎ Home
            </button>
        </div>
    );
}

export default AgentDashboard;
