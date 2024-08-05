import React, { useState } from 'react';
import axios from 'axios';

const AgentApplicationForm = () => {
    const [formData, setFormData] = useState({
        license_number: '',
        full_name: '',
        email: '',
        experience: '',
        phone_number: '',
        languages: '',
        agency_name: ''
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
            await axios.post('http://127.0.0.1:5050/user/agent-application', formData, {
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
                agency_name: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Apply to Become an Agent</h1>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="license_number">License Number</label>
                    <input
                        type="text"
                        id="license_number"
                        name="license_number"
                        value={formData.license_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="full_name">Full Name</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="experience">Experience</label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="languages">Languages</label>
                    <input
                        type="text"
                        id="languages"
                        name="languages"
                        value={formData.languages}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="agency_name">Agency Name</label>
                    <input
                        type="text"
                        id="agency_name"
                        name="agency_name"
                        value={formData.agency_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default AgentApplicationForm;
