import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    // Fetch user profile information
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                setUser(data);
                setFormData({
                    username: data.username,
                    email: data.email
                });
            } catch (err) {
                setError('Failed to fetch user profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/user/profile', { 
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            
            const data = await response.json();
            setUser(data); 
            setEditing(false);
        } catch (err) {
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>User Profile</h1>
            {!editing ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={() => setEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleUpdate}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit" disabled={loading}>Save Changes</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default UserProfile;
