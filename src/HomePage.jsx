// HomePage.jsx
import React from 'react';
import './HomePage.css';
// import houseImage1 from './images/house1.jpg'; 
// import houseImage2 from './images/house2.jpg';
// import houseImage3 from './images/house3.jpg';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="navbar">
                <div className="navbar-brand">Real Estate Dashboard</div>
                <nav className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/properties">Properties</a>
                    <a href="/reviews">Reviews</a>
                </nav>
                <div className="user-icon">
                    <span className="icon">👤</span>
                    <span className="role">Role</span>
                </div>
            </header>
            <main className="insights">
                <h2>Welcome to Our Real Estate Site</h2>
                <p>Explore the best properties available in your area!</p>
                {/* <div className="property-gallery">
                    <img src={houseImage1} alt="House 1" />
                    <img src={houseImage2} alt="House 2" />
                    <img src={houseImage3} alt="House 3" />
                </div> */}
            </main>
        </div>
    );
};

export default HomePage;
