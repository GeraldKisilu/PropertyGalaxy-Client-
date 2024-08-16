import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SingleUser from './SingleUser'; 
import Navbar from './Navbar';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://phase-5-group-project-backend-24.onrender.com/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsAuthorized(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigate('/not-authorized');
    }
  }, [isAuthorized, navigate]);

  const handleDeactivate = async (userId) => {
    try {
      await axios.post(`http://127.0.0.1:5050/api/admin/users/${userId}/deactivate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => (user.id === userId ? { ...user, active: false } : user)));
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await axios.post(`http://127.0.0.1:5050/api/admin/users/${userId}/reactivate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => (user.id === userId ? { ...user, active: true } : user)));
    } catch (error) {
      console.error('Error reactivating user:', error);
    }
  };

  const handleApplications = () => {
    navigate('/agent-application');
  };

  const handleHomePage = () => {
    navigate('/user-dashboard')
  }

  return (
    <div className="dashboard-container">
      {/* <Navbar /> */}
      <div className="dashboard-actions">
        <button className="dashboard-button" onClick={handleApplications}>
          Agent Applications
        </button>
        <button className="dashboard-button" onClick={handleHomePage}>
          🏠︎ Home
        </button>
      </div>
      <h1 className="dashboard-heading">Admin Dashboard</h1>
      <div className="user-management-section">
        <h2>User Management</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Email Confirmation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-users-message">No users found</td>
              </tr>
            ) : (
              users.map(user => (
                <SingleUser
                  key={user.id}
                  user={user}
                  onDeactivate={handleDeactivate}
                  onReactivate={handleReactivate}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
