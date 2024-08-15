import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from './assets/Images/proppertygalaxy.jfif';
import BoostButton from './BoostButton';
import Notification from './Notification';
import image1 from './assets/Images/homepage.jpg';
import livingroom from './assets/Images/livingroom.jpg';
import interior from './assets/Images/interior.jpg';
import icon1 from './assets/Images/agent.jpg';
import icon2 from './assets/Images/agent.jpg';
import icon3 from './assets/Images/agent.jpg';


const HomePage = () => {
    const [location, setLocation] = useState('');
    const [properties, setProperties] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [boostedProperties, setBoostedProperties] = useState([]);
    const [notification, setNotification] = useState(null); // State for notification
    const [showContactCard, setShowContactCard] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:5050/property/list')
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                const uniqueCities = [...new Set(data.map(property => property.city))];
                setSuggestions(uniqueCities);
            })
            .catch(error => console.error("There was an error fetching the properties:", error));

        fetchBoostedProperties();
    }, []);

    const fetchBoostedProperties = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5050/boost/properties');
            const data = await response.json();
            setBoostedProperties(data);
        } catch (error) {
            console.error("There was an error fetching boosted properties:", error);
        }
    };

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

    const handleBoostSuccess = (city, price, image) => {
        setNotification({ city, price, image }); // Set notification with city, price, and image
    };

    const handleCloseNotification = () => {
        setNotification(null); // Close the notification
    };

    return (
        <div className="home-page">

            {notification && (
                <Notification
                    city={notification.city}
                    price={notification.price}
                    image={notification.image}
                    onClose={handleCloseNotification}
                />
            )}

            <header className="navbar">
                <div>
                    <div className="app-name">Property Galaxy</div>
                </div>
                
                <nav className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/reviews">Reviews</Link>
                    <Link to="/favourites-page">❤️ Favorites</Link>
                    <Link to="/apply-agents">Become an agent?</Link>
                    <Link to="/profile">Profile </Link>
                </nav>
            </header>

            <main className="body-content">

                <div className="search-bar">
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

                {/* Boosted Properties Section at the top */}
                <section className="boosted-properties">
                    <h2>Boosted Properties</h2>
                    <div className="boosted-properties-grid">
                        {boostedProperties.map(property => (
                            <div className="boosted-property-item" key={property.id}>
                                <Link to={`/property/${property.id}`} className="favorites-link">
                                    {property.address}, {property.city} - ${property.price}
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="hero-featured-property">
                    <section className="hero" id="home">
                            <div className="hero-content">
                                <h2 className="hero-title">Find Your Dream House By Us</h2>
                                <p className="hero-text">
                                    Find your dream house with ease at Property Galaxy, where diverse listings and expert guidance meet your real estate needs. Explore, discover, and make informed decisions with us today!
                                </p>
                                <button className="contact-agent-button" onClick={toggleContactCard}>📞 Contact Agent</button>
                                    {showContactCard && (
                                        <div className="contact-card">
                                            <a href="mailto:info@propertygalaxy.com" className="contact-email">
                                                <ion-icon name="mail-outline"></ion-icon>
                                                <span>info@propertygalaxy.com</span>
                                            </a>
                                            <p>📞 +254 718 338217</p>
                                        </div>
                                    )}                            
                            </div>
                    </section>

                    <div className="featured-property">
                        <div className="property-details">
                            <img src={image1} alt="Property Galaxy" className="featured-property-image" />
                            <div className="property-gallery">
                                {/* Additional images can be added here */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='view-btn-container'>
                    <Link to="/properties" className="view-all-button">View All Properties</Link>
                </div>

                <section className="about" id="about">
                    <div className="container">
                        <figure className="about-banner">
                            <img src={livingroom} alt="House interior" />
                            <img src={interior} alt="House interior" className="abs-img" />
                        </figure>
                        <div className="about-content">
                            <p className="title">About Us</p>
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
                                "The only place that can make you comfortable enough to stay by yourself, with your companion and your whole extended family."
                            </p>
                        </div>
                    </div>
                </section>

                {/* Service Section */}
                <section className="service" id="service">
                        <p className="service-title">Our Services</p>
                        <h2 className="service-subtitle">Our Main Focus</h2>
                        <div className="service-list">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon1} alt="Service Icon" />
                                </div>
                                <h3 className="card-title">
                                    <Link to="/properties">Buy Property</Link>
                                </h3>
                                <p className="card-text">
                                    We offer professional consulting services to help you make informed decisions about your property investments.
                                </p>
                                <Link to="/properties" className="service-button">Read More</Link>

                            </div>
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon2} alt="Service Icon" />
                                </div>
                                <h3 className="card-title"><a href="#">Sell Property </a></h3>

                                <p className="card-text">Our property management services ensure that your real estate assets are well-maintained and profitable.</p>
                                <Link to="/agents" className="service-button">Read More</Link>

                            </div>
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon3} alt="Service Icon" />
                                </div>
                                <Link to="/rental" className="service-button">Read More</Link>
                                <p className="card-text">We provide in-depth market analysis to help you understand the real estate trends and make the right investment choices.</p>
                                <Link to="/properties" className="service-button">Read More</Link>
                            </div>
                        </div>
                </section>

            </main>

            {/* Footer Section */}
            <footer className="footer">
                {/* <ul className="header-top-list">
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
                </ul> */}
                <div className="footer-links">
                    <span style={{backgroundColor: '#f5f5f5'}}>Download our app:</span>
                    <span className="footer-icon">📱 Google Play</span>
                    <span className="footer-icon">🍏 App Store</span>
                    <span className="footer-icon">💳 Visa</span>
                    <span className="footer-icon">📲 Mpesa</span>
                </div>
                <div className="footer-terms">
                    <Link to="/terms">Terms and Conditions</Link>
                    <Link to="/privacy">Privacy Policyy</Link>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
