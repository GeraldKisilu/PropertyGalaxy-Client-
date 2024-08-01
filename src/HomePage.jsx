// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="navbar">
                <div className="navbar-brand">Property Galaxy</div>
                <nav className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/reviews">Reviews</Link>
                    {/* <Link to="/register">👤 Register</Link>
                    <Link to="/login">👤 Login</Link>  */}
                   
                    
                </nav>
                
            </header>
            <main className="insights">
                <h2>Welcome to Our Real Estate Site</h2>
                <p>Explore the best properties available in your area!</p>
            </main>
        </div>
    );
};

export default HomePage;
