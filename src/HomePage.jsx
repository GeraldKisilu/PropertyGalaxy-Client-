import React from 'react';
import { Link } from 'react-router-dom'; 
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
                    <Link to="/agents">Agents</Link>
                    <Link to = '/apply-agents'>Do you wanna be an agent? </Link>
                </nav>
            </header>
            <main className="body-content">
                <h2>Explore Our Properties</h2>
                <div className="property-gallery">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div className="property-card" key={index}>
                            <h3>House {index + 1}</h3>
                            <p>Price: ${Math.floor(Math.random() * 1000000)}</p>
                            <p>Description: This is a beautiful house located in a serene environment. It features modern amenities and spacious rooms.</p>
                            <div className="property-actions">
                                <button className="like-button">❤️ Like</button>
                                <button className="agent-button">📞 Contact Agent</button>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/properties" className="view-all-button">View All Properties</Link>
            </main>
            <footer className="footer">
                <div className="footer-links">
                    <span>Download our app:</span>
                    <span className="footer-icon">📱 Google Play</span>
                    <span className="footer-icon">🍏 App Store</span>
                    <span className="footer-icon">💳 Visa</span>
                    <span className="footer-icon">📲 Mpesa</span>
                </div>
                <div className="footer-terms">
                    <Link to="/terms">Terms and Conditions</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
