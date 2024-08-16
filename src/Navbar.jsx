import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './assets/Images/proppertygalaxy.jfif';

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Property Galaxy Logo" className="navbar-logo" />
                <div className="app-name">Property Galaxy</div>
            </div>

            <nav className="navbar-links">
                <NavLink to="/user-dashboard" activeClassName="active-link" exact>Home</NavLink>
                <NavLink to="/properties" activeClassName="active-link">Properties</NavLink>
                <NavLink to="/reviews" activeClassName="active-link">Reviews</NavLink>
                <NavLink to="/favourites-page" activeClassName="active-link">❤️ Favorites</NavLink>
                <NavLink to="/apply-agents" activeClassName="active-link">Become an agent?</NavLink>
                <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
            </nav>
        </header>
    );
};

export default Navbar;
