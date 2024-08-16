import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AgentApplication.css';

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
                if (response.status === 401) { // Unauthorized
                    navigate('/not-authorized');
                    return;
                }
                setApplications(response.data.applications);
            } catch (err) {
                setError('Failed to fetch applications.');
                toast.error('Failed to fetch applications.');
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
            toast.success(`Application ${status} successfully!`);
        } catch (err) {
            setError('Failed to update application status.');
            toast.error('Failed to update application status.');
        }
    };

    const confirmChange = (applicationId, status) => {
        if (window.confirm(`Are you sure you want to ${status} this application?`)) {
            handleStatusChange(applicationId, status);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar />
            <h1>Applications List</h1>
            <div className="application-container">
                {applications.length === 0 ? (
                    <p>No applications found.</p>
                ) : (
                    <table className="application-table">
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
                                        <button
                                            className="application-button"
                                            onClick={() => confirmChange(application.id, 'approved')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="application-button"
                                            onClick={() => confirmChange(application.id, 'rejected')}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AgentApplication;
