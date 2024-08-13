import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
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
                const response = await axios.get('http://127.0.0.1:5050/profile/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
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
                await axios.put('http://127.0.0.1:5050/profile/', profile, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                alert("Profile updated successfully!");
                setEditing(false);
             } 
        } catch (error) {
            setError(error.response ? error.response.data.message : "Failed to save profile");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your profile and account?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://127.0.0.1:5050/profile/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
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
                    <div style={{marginBottom: '20px'}}>
                        <img 
                            src={profile.photo_url} 
                            alt="Profile" 
                            style={{ borderRadius: '50%', width: '150px', height: '150px' }} 
                        />
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <p>{profile.full_name}</p>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <p>{profile.email}</p>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <p>{profile.bio}</p>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <p>{profile.phone_number}</p>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                            {profile.website}
                        </a>
                    </div>
                    <div>
                        <button style={{marginRight: '20px'}} onClick={() => setEditing(true)}>Edit Profile</button>
                        <button onClick={handleDelete}>Delete Profile</button>
                    </div>

                    {editing && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setEditing(false)}>&times;</span>
                                <h3>Edit Profile</h3>
                                <form onSubmit={handleSubmit}>
                                    <div style={{marginBottom: '20px'}}>
                                        <label>
                                            Photo URL:
                                            <div>
                                            <input type="text" name="photo_url" value={profile.photo_url} onChange={handleChange} />
                                            </div>
                                        </label>
                                    </div>
                                    <div style={{marginBottom: '20px'}}>
                                        <label>
                                            Bio:
                                            <div>
                                                <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
                                            </div>
                                        </label>
                                    </div>
                                    <div style={{marginBottom: '20px'}}>
                                        <label>
                                            Phone Number:
                                            <div>
                                            <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} />
                                            </div>
                                        </label>
                                    </div>
                                    <div style={{marginBottom: '30px'}}>
                                        <label>
                                            Website:
                                            <div>
                                                <input type="text" name="website" value={profile.website} onChange={handleChange} />
                                            </div>
                                        </label>
                                    </div>
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '20px'}}>
                        <label>
                            Photo URL:
                            <div>
                                <input type="text" name="photo_url" value={profile.photo_url} onChange={handleChange} />
                            </div>
                        </label>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <label>
                            Bio:
                            <div>
                                <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
                            </div>
                        </label>
                    </div>
                    <div style={{marginBottom: '20px'}}>
                        <label>
                            Phone Number:
                            <div>
                                <input type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} />
                            </div>
                        </label>
                    </div>
                    <div style={{marginBottom: '30px'}}>
                        <label>
                            Website:
                            <div>
                                <input type="text" name="website" value={profile.website} onChange={handleChange} />
                            </div>
                        </label>
                    </div>
                    <button type="submit">Save</button>
                </form>
            )}
        </div>
    );
};

export default UserProfile;


