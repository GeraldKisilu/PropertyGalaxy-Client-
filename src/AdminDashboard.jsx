import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SingleUser from './SingleUser'; 
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the list of users from the server
        const response = await axios.get('http://127.0.0.1:5050/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        // Handle error, e.g., redirect to an error page
        setIsAuthorized(false); // Remove this if not needed
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
      await axios.post(`http://127.0.0.1:5050/admin/users/${userId}/deactivate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => (user.id === userId ? { ...user, active: false } : user)));
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleReactivate = async (userId) => {
    try {
      await axios.post(`http://127.0.0.1:5050/admin/users/${userId}/reactivate`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => (user.id === userId ? { ...user, active: true } : user)));
    } catch (error) {
      console.error('Error reactivating user:', error);
    }
  };
 function handleApplications(){
    navigate('/agent-application')
 }
  return (
    <div>
      <Navbar />
        <button onClick={handleApplications}>Agent Applications</button>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th color='black'>ID</th>
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
                <td colSpan="5">No users found</td>
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
