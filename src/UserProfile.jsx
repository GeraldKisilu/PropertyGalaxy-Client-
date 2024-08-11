// import React, { useState, useEffect } from 'react';

// const UserProfile = () => {
//     const [user, setUser] = useState(null);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: ''
//     });
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [editing, setEditing] = useState(false);

//     // Fetch user profile information
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch('/user/profile', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Network response was not ok');

//                 const data = await response.json();
//                 setUser(data);
//                 setFormData({
//                     username: data.username,
//                     email: data.email
//                 });
//             } catch (err) {
//                 setError('Failed to fetch user profile.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, [token]);

//     // Handle profile update
//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('/user/profile', { 
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) throw new Error('Network response was not ok');
            
//             const data = await response.json();
//             setUser(data); 
//             setEditing(false);
//         } catch (err) {
//             setError('Failed to update profile.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div>
//             <h1>User Profile</h1>
//             {!editing ? (
//                 <div>
//                     <p><strong>Username:</strong> {user.username}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <button onClick={() => setEditing(true)}>Edit Profile</button>
//                 </div>
//             ) : (
//                 <form onSubmit={handleUpdate}>
//                     <label>
//                         Username:
//                         <input
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                             required
//                         />
//                     </label>
//                     <br />
//                     <label>
//                         Email:
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                             required
//                         />
//                     </label>
//                     <br />
//                     <button type="submit" disabled={loading}>Save Changes</button>
//                     <button type="button" onClick={() => setEditing(false)}>Cancel</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default UserProfile;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        photo_url: '',
        bio: '',
        phone_number: '',
        website: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profileExists, setProfileExists] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:5050/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
                setProfileExists(true);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setProfileExists(false);
                } else {
                    setError(error.response ? error.response.data.message : "Failed to fetch profile");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (profileExists) {
                await axios.put('http://127.0.0.1:5050/profile', profile, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Profile updated successfully!");
                setEditing(false);
            } else {
                await axios.post('http://127.0.0.1:5050/profile', profile, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Profile created successfully!");
                setProfileExists(true);
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : "Failed to save profile");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile and account?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://127.0.0.1:5050/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Profile and account deleted successfully!");
                navigate('/');
            } catch (error) {
                setError(error.response ? error.response.data.message : "Failed to delete profile");
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>User Profile</h2>
            {profileExists ? (
                <div>
                    <div>
                        <img 
                            src={profile.photo_url} 
                            alt="Profile" 
                            style={{ borderRadius: '50%', width: '150px', height: '150px' }} 
                        />
                    </div>
                    <div>
                        <p>{profile.bio}</p>
                    </div>
                    <div>
                        <p>{profile.phone_number}</p>
                    </div>
                    <div>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            {profile.website}
                        </a>
                    </div>
                    <div>
                        <button onClick={() => setEditing(true)}>Edit Profile</button>
                        <button onClick={handleDelete}>Delete Profile</button>
                    </div>

                    {editing && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setEditing(false)}>&times;</span>
                                <h3>Edit Profile</h3>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Photo URL:
                                        <input type="text" name="photo_url" value={profile.photo_url} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Bio:
                                        <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
                                    </label>
                                    <label>
                                        Phone Number:
                                        <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} />
                                    </label>
                                    <label>
                                        Website:
                                        <input type="text" name="website" value={profile.website} onChange={handleChange} />
                                    </label>
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Photo URL:
                        <input type="text" name="photo_url" value={profile.photo_url} onChange={handleChange} />
                    </label>
                    <label>
                        Bio:
                        <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
                    </label>
                    <label>
                        Phone Number:
                        <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} />
                    </label>
                    <label>
                        Website:
                        <input type="text" name="website" value={profile.website} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default UserProfile;


