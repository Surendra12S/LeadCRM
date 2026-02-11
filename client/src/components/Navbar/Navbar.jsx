import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="navbar-brand">
                    LeadCRM
                </div>
                <div className="navbar-links">
                    <Link
                        to="/leads/new"
                        className={`nav-link ${location.pathname === '/leads/new' ? 'active' : ''}`}
                    >
                        New Lead
                    </Link>
                    <Link
                        to="/leads"
                        className={`nav-link ${location.pathname === '/leads' ? 'active' : ''}`}
                    >
                        All Leads
                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle-btn"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
