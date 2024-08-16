import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserPurchaseRequest.css'; // Import the CSS file for styling

const UserPurchaseRequest = () => {
    const { propertyId } = useParams();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        requestId: null,
        status: null
    });

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5050/purchase_request/agent/list/${propertyId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRequests(response.data.purchase_requests || response.data);
            } catch (err) {
                setError('Failed to fetch requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [propertyId]);

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
            setRequests(response.data.purchase_requests || response.data);
            setSuccess(`Request ${status.toLowerCase()}d successfully.`);
            setConfirmationDialog({ open: false, requestId: null, status: null });
        } catch (err) {
            setError('Failed to update request status.');
        } finally {
            setTimeout(() => {
                setSuccess(null);
                setError(null);
            }, 5000); // Clear message after 5 seconds
        }
    };

    const openConfirmationDialog = (purchaseRequestId, status) => {
        setConfirmationDialog({
            open: true,
            requestId: purchaseRequestId,
            status: status
        });
    };

    const handleConfirmation = (confirm) => {
        if (confirm && confirmationDialog.requestId && confirmationDialog.status) {
            handleStatusChange(confirmationDialog.requestId, confirmationDialog.status);
        } else {
            setConfirmationDialog({ open: false, requestId: null, status: null });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="purchase-request-container">
            <h1>Purchase Requests List</h1>
            {success && <p className="success-message">{success}</p>}
            {confirmationDialog.open && (
                <div className="confirmation-dialog">
                    <p>Are you sure you want to {confirmationDialog.status.toLowerCase()} this request?</p>
                    <button onClick={() => handleConfirmation(true)}>Yes</button>
                    <button onClick={() => handleConfirmation(false)}>No</button>
                </div>
            )}
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <table className="requests-table">
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
                                            <button 
                                                className="approve-button" 
                                                onClick={() => openConfirmationDialog(request.id, 'Approve')}>
                                                Approve
                                            </button>
                                            <button 
                                                className="reject-button" 
                                                onClick={() => openConfirmationDialog(request.id, 'Reject')}>
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
