import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Button from './Button';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo-text">
                    Hearth <span className="ampersand">&</span> Pages
                </Link>
                
                <ul className="nav-links">
                    <li><Link to='/'>Collection</Link></li>
                    <li><Link to='/about'>Our Story</Link></li>
                    <li><Link to='/articles'>Reading List</Link></li>
                    
                    {/* NEW: Show My Archives only if logged in */}
                    {token && (
                        <li><Link to='/my-archives'>My Archives</Link></li>
                    )}
                </ul>

                <div className="nav-actions">
                    {token ? (
                        <Button className="login-btn" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Link to="/login">
                            <Button className="login-btn">Member Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;