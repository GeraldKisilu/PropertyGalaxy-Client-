import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import BoostButton from './BoostButton';
import Notification from './Notification';
import image1 from './assets/Images/homepage.jpg';
import livingroom from './assets/Images/livingroom.jpg';
import interior from './assets/Images/interior.jpg';
import icon1 from './assets/Images/agent.jpg';
import icon2 from './assets/Images/agent.jpg';
import icon3 from './assets/Images/agent.jpg';
import Navbar from './Navbar'; // Assuming Navbar is a valid component

const HomePage = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [boostedProperties, setBoostedProperties] = useState([]);
    const [notification, setNotification] = useState(null);
    const [showContactCard, setShowContactCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:5050/property/list')
            .then(response => response.json())
            .then(data => {
                const uniqueCities = [...new Set(data.map(property => property.city))];
                setSuggestions(uniqueCities);
            })
            .catch(error => console.error("There was an error fetching the properties:", error));

        fetchBoostedProperties();
    }, []);

    const fetchBoostedProperties = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5050/boost/properties');

            if (response.status === 401) { // Unauthorized
                navigate('/not-authorized');
                return;
            }
            const data = await response.json();
            setBoostedProperties(data);
        } catch (error) {
            console.error("There was an error fetching boosted properties:", error);
        }
    };

    const handleSearch = () => {
        if (location) {
            navigate(`/search/property/city/${encodeURIComponent(location)}`);
        } else {
            console.warn('No location provided');
        }
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const toggleContactCard = () => {
        setShowContactCard(!showContactCard);
    };

    const handleBoostSuccess = (city, price, image) => {
        setNotification({ city, price, image });
    };

    const handleCloseNotification = () => {
        setNotification(null);
    };

    return (
        <div className="home-page">
            <Navbar />

            {notification && (
                <Notification
                    city={notification.city}
                    price={notification.price}
                    image={notification.image}
                    onClose={handleCloseNotification}
                />
            )}

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
                            <h2 className="section-title">The Leading Real Estate Rental Marketplace.</h2>
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
                            <h3 className="card-title">
                                <Link to="/agents">Sell Property</Link>
                            </h3>
                            <p className="card-text">
                                Our property management services ensure that your real estate assets are well-maintained and profitable.
                            </p>
                            <Link to="/agents" className="service-button">Read More</Link>
                        </div>
                        <div className="service-card">
                            <div className="card-icon">
                                <img src={icon3} alt="Service Icon" />
                            </div>
                            <h3 className="card-title">
                                <Link to="/rentals">Rent Property</Link>
                            </h3>
                            <p className="card-text">
                                Explore a diverse range of properties available for rent, tailored to fit your lifestyle and budget.
                            </p>
                            <Link to="/rentals" className="service-button">Read More</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;