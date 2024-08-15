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
    const [notification, setNotification] = useState(null);

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
        if (location.trim() !== '') {
            fetch(`http://127.0.0.1:5050/property/city/${location}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); 
                    setProperties(data);
                })
                .catch(error => console.error("There was an error searching for properties:", error));

        }
    };


    const handleChange = (event) => {
        setLocation(event.target.value);
        if (event.target.value.trim() === '') {
            // Fetch all properties if search is cleared
            fetch('http://127.0.0.1:5050/property/list')
                .then(response => response.json())
                .then(data => setProperties(data))
                .catch(error => console.error("There was an error fetching the properties:", error));
        }
    };

    const handleBoostSuccess = (city, price, image) => {
        setNotification({ city, price, image });
    };

    const handleCloseNotification = () => {
        setNotification(null);
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
            <header className="header">
                <div className="overlay"></div>
                <div className="header-top">
                    <div className="container">
                        <div className="wrapper"></div>
                    </div>
                </div>
            </header>

            <header className="navbar">
                <div className="navbar-content">
                    <div className="navbar-brand">Property Galaxy</div>
                </div>
                <nav className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/reviews">Reviews</Link>
                    <Link to="/apply-agents">Do you wanna be an agent?</Link>
                    <Link to="/favourites-page">❤️ Favorites</Link>
                </nav>
            </header>

            <Link to="/profile">
                <button className="header-top-btn">Profile</button>
            </Link>

            <main className="body-content">
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

                <div className="hero-featured-property">
                    <section className="hero" id="home">
                        <div className="container">
                            <div className="hero-content">
                                <h2 className="hero-title">Find Your Dream House By Us</h2>
                                <p className="hero-text">
                                    Find your dream house with ease at Property Galaxy, where diverse listings and expert guidance meet your real estate needs. Explore, discover, and make informed decisions with us today!
                                </p>
                                <button className="contact-agent-button">📞 Contact Agent</button>
                            </div>
                        </div>
                    </section>

                    <div className="featured-property">
                        <div className="property-details">
                            <h2>Featured Property</h2>
                            <img src={image1} alt="Property Galaxy" className="featured-property-image" />
                            <p>Price: $500,000</p>
                            <p>Description: This is a beautiful house located in a serene environment. It features modern amenities and spacious rooms.</p>
                        </div>
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
                                "The only place that can make you comfortable enough to stay by yourself, with your companion and your whole extended family."
                            </p>
                            <a href="#service" className="btn">Our Services</a>
                        </div>
                    </div>
                </section>

                <section className="service" id="service">
                    <div className="container">
                        <p className="section-subtitle">Our Services</p>
                        <h2 className="h2 section-title">Our Main Focus</h2>
                        <div className="service-list">
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon1} alt="Service Icon" />
                                </div>
                                <h3 className="card-title">
                                    <Link to="/properties">Buy Property</Link>
                                </h3>
                                <p className="card-text">
                                    Discover a range of homes for sale in different cities and communities. Find your perfect fit.
                                </p>
                                <Link to="/properties" className="btn-link">
                                    <span>Find A Property</span>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </Link>
                            </div>
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon2} alt="Service Icon" />
                                </div>
                                <h3 className="card-title">
                                    <Link to="/rentals">Rent Property</Link>
                                </h3>
                                <p className="card-text">
                                    Explore rental options that meet your needs and budget. From apartments to houses, we have it all.
                                </p>
                                <Link to="/rentals" className="btn-link">
                                    <span>Find Rentals</span>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </Link>
                            </div>
                            <div className="service-card">
                                <div className="card-icon">
                                    <img src={icon3} alt="Service Icon" />
                                </div>
                                <h3 className="card-title">
                                    <Link to="/mortgages">Mortgages</Link>
                                </h3>
                                <p className="card-text">
                                    Secure financing for your property with the best mortgage rates and terms available.
                                </p>
                                <Link to="/mortgages" className="btn-link">
                                    <span>Learn More</span>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
