import React from 'react';
import './NotAuthorized.css';

const NotAuthorized = () => {
    return (
        <div className="not-authorized">
            <h1 className="heading">403 Forbidden</h1>
            <p className="message">You do not have permission to access this page.</p>
            <a href="/" className="home-link">Go back to Login</a>
        </div>
    );
};

export default NotAuthorized;
