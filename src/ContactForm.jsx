
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const propertyId = queryParams.get('property_id');
  const agentId = queryParams.get('agent_id');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      email,
      subject,
      message,
      property_id: parseInt(propertyId),
      agent_id: parseInt(agentId),
    };

    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:5050/contact/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setResponseMessage(data.message);
      setErrorMessage('');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setAgentId('');
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Error sending message. Please try again.');
      setResponseMessage('');
    }
  };

  return (
    <div>
      <h2>Contact Agent</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        <div>
        <input type="hidden" name="property_id" value={propertyId} />
        <input type="hidden" name="agent_id" value={agentId} />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};
export default ContactForm;
