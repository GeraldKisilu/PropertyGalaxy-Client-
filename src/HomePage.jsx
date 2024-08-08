import React, { useState } from 'react';
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
                            <button className="header-top-btn">Profile</button>
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
                    <Link to="/favorites">❤️ Favorites</Link>
                </nav>
            </header>

            <main className="body-content">
                <div className="search-bar">
                    <img src={logo} alt="Property Galaxy" className="logo" />
                    <input type="text" placeholder="Search by location" />
                    <button>Search</button>
                </div>

                <div className="hero-featured-property">
                    <section className="hero" id="home">
                        <div className="container">
                            <div className="hero-content">
                                <h2 className="h1 hero-title">Find Your Dream House By Us</h2>
                                <p className="hero-text">
                                    Find your dream house with ease at [PropertyGalaxy], where diverse listings and
                                    expert guidance meet your real estate needs. Explore, discover, and make informed decisions
                                    with us today!
                                </p>
                                <button className="contact-agent-button" onClick={toggleContactCard}>📞 Contact Agent</button>
                            </div>
                        </div>
                    </section>

                    <div className="featured-property">
                        <div className="property-details">
                            <h2>Featured Property</h2>
                            <img src={image1} alt="Property Galaxy" className="Featured Property" />
                            <div className="property-gallery">
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
                                Over 30,000 people work for us in more than 70 countries all over the world. This breadth of global
                                coverage, combined with specialist services.
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
                                "The only place that can make you comfortable enough to stay by yourself,
                                with your companion and your whole extended family."
                            </p>
                            <a href="#service" className="btn">Our Services</a>
                        </div>
                    </div>
                </section>

                {/* Service Section */}
                <section className="service" id="service">
                    <div className="container">
                        <div className="service-list">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon1} alt="Service Icon" />
                                </div>
                                <h3 className="card-title"><a href="#">Consulting Services</a></h3>
                                <p className="card-text">We offer professional consulting services to help you make informed real estate decisions.</p>
                                <a href="#" className="card-link">Learn More <i className="fas fa-arrow-right"></i></a>
                            </div>
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon2} alt="Service Icon" />
                                </div>
                                <h3 className="card-title"><a href="#">Property Management</a></h3>
                                <p className="card-text">Our team manages properties with the utmost care and attention to detail.</p>
                                <a href="#" className="card-link">Learn More <i className="fas fa-arrow-right"></i></a>
                            </div>
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon3} alt="Service Icon" />
                                </div>
                                <h3 className="card-title"><a href="#">Market Analysis</a></h3>
                                <p className="card-text">We provide in-depth market analysis to help you understand the real estate trends.</p>
                                <a href="#" className="card-link">Learn More <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Section */}
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
