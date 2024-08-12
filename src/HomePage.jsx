import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from './assets/Images/proppertygalaxy.jfif';
import image1 from './assets/Images/homepage.jpg';
import livingroom from './assets/Images/livingroom.jpg';
import interior from './assets/Images/interior.jpg';
import icon1 from './assets/Images/agent.jpg';
import icon2 from './assets/Images/agent.jpg';
import icon3 from './assets/Images/agent.jpg';

const HomePage = () => {
    const [showContactCard, setShowContactCard] = useState(false);
    const [location, setLocation] = useState('');
    const [properties, setProperties] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5050/property/list')
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                const uniqueCities = [...new Set(data.map(property => property.city))];
                setSuggestions(uniqueCities);
            })
            .catch(error => console.error("There was an error fetching the properties:", error));
    }, []);

    const handleSearch = () => {
        const filteredProperties = properties.filter(property => property.city.toLowerCase().includes(location.toLowerCase()));
        setProperties(filteredProperties);
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const toggleContactCard = () => {
        setShowContactCard(!showContactCard);
    };

    return (
        <div className="home-page">
            <header className="header">
                <div className="overlay"></div>
                <div className="header-top">
                    <div className="container">
                        <ul className="header-top-list">
                            <li>
                                <a href="mailto:info@propertygalaxy.com" className="header-top-link">
                                    <ion-icon name="mail-outline"></ion-icon>
                                    <span>info@propertygalaxy.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="header-top-link">
                                    <ion-icon name="location-outline"></ion-icon>
                                    <address>15/A, Nairobi, Kenya</address>
                                </a>
                            </li>
                        </ul>
                        <div className="wrapper">
                            <ul className="header-top-social-list">
                                <li><a href="#" className="header-top-social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
                                <li><a href="#" className="header-top-social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
                                <li><a href="#" className="header-top-social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
                                <li><a href="#" className="header-top-social-link"><ion-icon name="logo-pinterest"></ion-icon></a></li>
                            </ul>
                            <Link to="/profile">
                                <button className="header-top-btn">Profile</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <header className="navbar">
                <div className="navbar-content">
                    <div className="navbar-brand">
                        Property Galaxy
                    </div>
                    <ul className="navbar-social-list">
                        <li><a href="#" className="navbar-social-link"><ion-icon name="logo-facebook"></ion-icon></a></li>
                        <li><a href="#" className="navbar-social-link"><ion-icon name="logo-twitter"></ion-icon></a></li>
                        <li><a href="#" className="navbar-social-link"><ion-icon name="logo-instagram"></ion-icon></a></li>
                        <li><a href="#" className="navbar-social-link"><ion-icon name="logo-pinterest"></ion-icon></a></li>
                    </ul>
                </div>
                <nav className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/reviews">Reviews</Link>
                    <Link to="/apply-agents">Do you wanna be an agent?</Link>
                    <Link to="/favourites-page">❤️ Favorites</Link>
                </nav>
            </header>

            <main className="body-content">
                <div className="search-bar">
                    <img src={logo} alt="Property Galaxy" className="logo" />
                    <input
                        type="text"
                        value={location}
                        onChange={handleChange}
                        placeholder="Search by location"
                        list="location-suggestions"
                    />
                    <datalist id="location-suggestions">
                        {suggestions.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div className="hero-featured-property">
                    <section className="hero" id="home">
                        <div className="container">
                            <div className="hero-content">
                                <h2 className="h1 hero-title">Find Your Dream House By Us</h2>
                                <p className="hero-text">
                                    Find your dream house with ease at Property Galaxy, where diverse listings and expert guidance meet your real estate needs. Explore, discover, and make informed decisions with us today!
                                </p>
                                <button className="contact-agent-button" onClick={toggleContactCard}>📞 Contact Agent</button>
                            </div>
                        </div>
                    </section>

                    <div className="featured-property">
                        <div className="property-details">
                            <h2>Featured Property</h2>
                            <img src={image1} alt="Property Galaxy" className="featured-property-image" />
                            <div className="property-gallery">
                                {/* Additional images can be added here */}
                            </div>
                            <p>Price: $500,000</p>
                            <p>Description: This is a beautiful house located in a serene environment. It features modern amenities and spacious rooms.</p>
                        </div>
                        {showContactCard && (
                            <div className="contact-card">
                                <h3>Contact Agent</h3>
                                <p>Email: agent@example.com</p>
                                <p>Phone: (123) 456-7890</p>
                                <button onClick={toggleContactCard}>Close</button>
                            </div>
                        )}
                    </div>
                </div>

                <Link to="/properties" className="view-all-button">View All Properties</Link>

                <section className="about" id="about">
                    <div className="container">
                        <figure className="about-banner">
                            <img src={livingroom} alt="House interior" />
                            <img src={interior} alt="House interior" className="abs-img" />
                        </figure>
                        <div className="about-content">
                            <p className="section-subtitle">About Us</p>
                            <h2 className="h2 section-title">The Leading Real Estate Rental Marketplace.</h2>
                            <p className="about-text">
                                Over 30,000 people work for us in more than 70 countries all over the world. This breadth of global coverage, combined with specialist services.
                            </p>
                            <ul className="about-list">
                                <li className="about-item">
                                    <div className="about-item-icon">
                                        <ion-icon name="home-outline"></ion-icon>
                                    </div>
                                    <p className="about-item-text">Smart Home Design</p>
                                </li>
                                <li className="about-item">
                                    <div className="about-item-icon">
                                        <ion-icon name="leaf-outline"></ion-icon>
                                    </div>
                                    <p className="about-item-text">Beautiful Scene Around</p>
                                </li>
                                <li className="about-item">
                                    <div className="about-item-icon">
                                        <ion-icon name="wine-outline"></ion-icon>
                                    </div>
                                    <p className="about-item-text">Exceptional Lifestyle</p>
                                </li>
                                <li className="about-item">
                                    <div className="about-item-icon">
                                        <ion-icon name="shield-checkmark-outline"></ion-icon>
                                    </div>
                                    <p className="about-item-text">Complete 24/7 Security</p>
                                </li>
                            </ul>
                            <p className="callout">
                                <strong>15+</strong> Years of Experience
                            </p>
                        </div>
                    </div>
                </section>

                <section className="property">
                    <h2>Properties</h2>
                    <div className="property-list">
                        {properties.map(property => (
                            <div className="property-card" key={property.id}>
                                <img src={property.imageUrl} alt="Property" className="property-image" />
                                <h3>{property.name}</h3>
                                <p>Price: {property.price}</p>
                                <p>Location: {property.city}</p>
                                
                               
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
