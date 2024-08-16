import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AgentProperty from './AgentProperties';

import { useNavigate } from 'react-router-dom';

import { FaEnvelope, FaPlus } from 'react-icons/fa'; // Importing the envelope and plus icons


function AgentDashboard() {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');

    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
  


    const handleRefresh = () => {
        setRefresh(prevRefresh => !prevRefresh);
    };

    useEffect(() => {

      const fetchProperties = () => {
        fetch('http://127.0.0.1:5050/property/agents', {
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
    }, [refresh]);

    const handleHomePage = () => {
      navigate('/user-dashboard')
    }
  
    
  return (
    <div>AgentDashboard
        <Link to = '/add-property'>Add Property</Link>
        <Link to = '/agent-messages'>Agent Messages</Link>
        <button className='dashboard-button' onClick={handleHomePage}>
      🏠︎ Home
      </button>
       
        {properties.map(property => (
            

          <AgentProperty key = {property.id} property={property} onRefresh = {handleRefresh}/>
        )
        )}
         

        

    </div>
  )
}
=======
//         const fetchProperties = () => {
//             fetch('http://127.0.0.1:5050/property/agents', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch properties');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setProperties(data);
//             })
//             .catch((err) => {
//                 setError(err.message);
//             });
//         };

//         fetchProperties();
//     }, [refresh]);


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
        </div>
    );
}

export default AgentDashboard;
