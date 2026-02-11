import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav className="navbar" style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div className="brand" style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                }}>
                    LeadCRM
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link
                        to="/leads/new"
                        style={{
                            color: location.pathname === '/leads/new' ? 'var(--primary-color)' : 'var(--text-secondary)',
                            fontWeight: 500
                        }}
                    >
                        New Lead
                    </Link>
                    <Link
                        to="/leads"
                        style={{
                            color: location.pathname === '/leads' ? 'var(--primary-color)' : 'var(--text-secondary)',
                            fontWeight: 500
                        }}
                    >
                        All Leads
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
