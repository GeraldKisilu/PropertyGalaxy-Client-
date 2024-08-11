import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './ContactForm.css'; 

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const propertyId = queryParams.get('property_id');
  const agentId = queryParams.get('agent_id');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const contactData = {
      name,
      email,
      subject,
      message,
      property_id: propertyId ? parseInt(propertyId) : null,
      agent_id: agentId ? parseInt(agentId) : null,
    };

    console.log(contactData)

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:5050/contact/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      const data = await response.json();
      setResponseMessage(data.message);
      setErrorMessage('');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Error sending message. Please try again.');
      setResponseMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (

    <div className={`contact-form-container ${isVisible ? 'show' : 'hidden'}`}>
      <div className="contact-form-header" onClick={toggleVisibility}>
        {isVisible ? 'Close Contact Form' : 'Open Contact Form'}
      </div>
      {isVisible && (
        <div className="contact-form-content">
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      )}


export default ContactForm;
