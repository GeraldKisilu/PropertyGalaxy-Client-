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

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:5050/contact/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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

  return (
    <div className="contact-form-container">
      <h2>Contact Agent</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            className="form-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            className="form-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {responseMessage && (
          <div className={`response-message success`}>
            {responseMessage}
          </div>
        )}
        {errorMessage && (
          <div className={`response-message error`}>
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
