import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentApplication = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5050/admin/applications', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setApplications(response.data.applications);
            } catch (err) {
                setError('Failed to fetch applications.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleStatusChange = async (applicationId, status) => {
        try {
            await axios.patch(`http://127.0.0.1:5050/admin/applications/${applicationId}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh the list after updating the status
            const response = await axios.get('http://127.0.0.1:5050/admin/applications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setApplications(response.data.applications);
        } catch (err) {
            setError('Failed to update application status.');
        }
    };

    const confirmChange = (applicationId, status) => {
        if (window.confirm('Are you sure you want to change the status?')) {
            handleStatusChange(applicationId, status);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Applications List</h1>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>License Number</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Experience</th>
                            <th>Phone Number</th>
                            <th>Languages</th>
                            <th>Agency Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td>{application.license_number}</td>
                                <td>{application.full_name}</td>
                                <td>{application.email}</td>
                                <td>{application.experience}</td>
                                <td>{application.phone_number}</td>
                                <td>{application.languages}</td>
                                <td>{application.agency_name}</td>
                                <td>{application.status}</td>
                                <td>
                                    <button onClick={() => confirmChange(application.id, 'approved')}>
                                        Approve
                                    </button>
                                    <button onClick={() => confirmChange(application.id, 'rejected')}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AgentApplication;
