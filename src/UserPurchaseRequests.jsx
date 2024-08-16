import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserPurchaseRequest = () => {
    const { propertyId } = useParams(); // Call useParams as a function
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5050/purchase_request/agent/list/${propertyId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRequests(response.data.purchase_requests || response.data); // Adjust based on actual response structure
            } catch (err) {
                setError('Failed to fetch requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [propertyId]); // Add propertyId as a dependency

    const handleStatusChange = async (purchaseRequestId, status) => {
        try {
            await axios.patch(`http://127.0.0.1:5050/purchase_request/agent/${purchaseRequestId}/approve`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Refresh the list after updating the status
            const response = await axios.get(`http://127.0.0.1:5050/purchase_request/agent/list/${propertyId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRequests(response.data.purchase_requests || response.data); // Adjust based on actual response structure
        } catch (err) {
            setError('Failed to update request status.');
        }
    };

    const confirmChange = (purchaseRequestId, status) => {
        if (window.confirm(`Are you sure you want to ${status} this request?`)) {
            handleStatusChange(purchaseRequestId, status);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Purchase Requests List</h1>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Property ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map(request => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.user_id}</td>
                                <td>{request.property_id}</td>
                                <td>{request.status}</td>
                                <td>
                                    {request.status === 'Pending' && (
                                        <>
                                            <button onClick={() => confirmChange(request.id, 'Approve')}>
                                                Approve
                                            </button>
                                            <button onClick={() => confirmChange(request.id, 'Reject')}>
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {request.status === 'Approved' && <span>Approved</span>}
                                    {request.status === 'Rejected' && <span>Rejected</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPurchaseRequest;