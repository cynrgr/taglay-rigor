import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Button from './Button';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo-text">
                    Hearth <span className="ampersand">&</span> Pages
                </Link>
                
                <ul className="nav-links">
                    <li>
                        <Link to='/'>Collection</Link>
                    </li>
                    <li>
                        <Link to='/about'>Our Story</Link>
                    </li>
                    <li>
                        <Link to='/articles'>Reading List</Link>
                    </li>
                </ul>

                <div className="nav-actions">
                    <Button className="login-btn">Member Login</Button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;