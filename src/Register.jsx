// Register.jsx
import React, { useState } from 'react';

const Register = () => {
    // State to manage form inputs
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(1); // Default role ID, adjust as necessary

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            full_name: fullName,
            email: email,
            password: password,
            role_id: roleId,
        };

        try {
            const response = await fetch('http://127.0.0.1:5050/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User registered successfully:', result);
                // Reset form or handle success message
            } else {
                console.error('Error registering user:', response.statusText);
                // Handle error
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network error
        }
    };

    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Enter your role ID (e.g., 1 for user)"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Register;
