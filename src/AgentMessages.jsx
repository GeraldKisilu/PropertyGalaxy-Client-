import React, { useState, useEffect } from 'react';
 

const AgentMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5050/contact/agent', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMessages(data);
            } catch (err) {
                setError('Failed to fetch messages. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Messages</h1>
            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <h2>{message.subject}</h2>
                            <p><strong>From:</strong> {message.name} ({message.email})({message.user_id}) ({message.user_name})</p>
                            <p><strong>Property ID:</strong> {message.property_id}</p>
                            <p><strong>Subject:</strong> {message.subject}</p>
                            <p><strong>Message:</strong> {message.message}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AgentMessages;
