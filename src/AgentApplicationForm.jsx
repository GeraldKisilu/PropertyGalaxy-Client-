import React, { useState } from 'react';
import axios from 'axios';
import './AgentApplicationForm.css'; 
import Navbar from './Navbar';

const AgentApplicationForm = () => {
    const [formData, setFormData] = useState({
        license_number: '',
        full_name: '',
        email: '',
        experience: '',
        phone_number: '',
        languages: '',
        agency_name: '',
        photo_url: '' 
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('https://phase-5-group-project-backend-24.onrender.com/user/agent-application', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccess('Application submitted successfully.');
            setFormData({
                license_number: '',
                full_name: '',
                email: '',
                experience: '',
                phone_number: '',
                languages: '',
                agency_name: '',
                photo_url: '' 
            });
            if (response.status === 401) { // Unauthorized
                navigate('/not-authorized');
                return;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="agent-application-form">
            <Navbar />
            <h1 className="form-heading">Apply to Become an Agent</h1>
            {success && <p className="form-success">{success}</p>}
            {error && <p className="form-error">{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="license_number" className="form-label">License Number</label>
                    <input
                        type="text"
                        id="license_number"
                        name="license_number"
                        value={formData.license_number}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your license number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="full_name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="experience" className="form-label">Experience</label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Describe your experience"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="languages" className="form-label">Languages</label>
                    <input
                        type="text"
                        id="languages"
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter languages you speak"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="agency_name" className="form-label">Agency Name</label>
                    <input
                        type="text"
                        id="agency_name"
                        name="agency_name"
                        value={formData.agency_name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your agency name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo_url" className="form-label">Photo URL</label>
                    <input
                        type="url"
                        id="photo_url"
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter the URL of your photo"
                        required
                    />
                </div>
                <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default AgentApplicationForm;
