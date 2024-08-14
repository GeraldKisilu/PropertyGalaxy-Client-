import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Agent() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5050/agents/list'); // Adjust the URL as needed

        if (!response.ok) {
          throw new Error('Failed to fetch agents');
        }

        const data = await response.json();
        setAgents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) return <p>Loading agents...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Agents</h2>
      <div className="agent-list">
        {agents.length > 0 ? (
          agents.map(agent => (
            <div key={agent.id} className="agent-card">
              <div className="agent-photo">
                {agent.photo_url ? <img src={agent.photo_url} alt={agent.full_name} /> : <div className="placeholder-photo">No Photo</div>}
              </div>
              <h3>{agent.full_name}</h3>
              <p>Email: {agent.email}</p>
              <p>Phone: {agent.phone_number}</p>
              <p>Experience: {agent.experience}</p>
              <p>For Sale: {agent.for_sale}</p>
              <p>Sold: {agent.sold}</p>
              <p>Languages: {agent.languages}</p>
              <p>Agency: {agent.agency_name}</p>
              <p>Listed Properties: {agent.listed_properties}</p>
              <Link to={`/agent/${agent.id}`} className="btn btn-primary">View Details</Link>
            </div>
          ))
        ) : (
          <p>No agents available.</p>
        )}
      </div>
    </div>
  );
}

export default Agent;
