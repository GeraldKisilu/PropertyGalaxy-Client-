import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AgentProperty from './AgentProperties';

function AgentDashboard() {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const [refresh, setRefresh] = useState(false)
  

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
    
  return (
    <div>AgentDashboard
        <Link to = '/add-property'>Add Property</Link>
        <Link to = '/agent-messages'>Agent Messages</Link>
       
        {properties.map(property => (
            

          <AgentProperty key = {property.id} property={property} onRefresh = {handleRefresh}/>
        )
        )}
         

        

    </div>
  )
}


export default AgentDashboard
