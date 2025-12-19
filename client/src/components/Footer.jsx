import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; 

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="library-footer">
            <div className="footer-divider"></div>

            <div className="footer-content">
                
                <div className="footer-section brand-section">
                    <h4 className="footer-heading">Hearth & Pages.</h4>
                    <p className="footer-text">
                        A digital sanctuary for stories. We believe in the power of 
                        slow reading, human curation, and the timeless beauty of 
                        the written word.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Correspondence</h4>
                    <ul className="footer-contact-list">
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                            <span>cynrgr@hearth&pages.com</span>
                        </li>
                        <li>
                            <span className="label">Head Librarian:</span> Francyne Rigor
                        </li>
                        <li>
                            <span className="label">Location:</span> Quezon City
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Literary Society</h4>
                    <p className="footer-subtext">Join our reading circle.</p>
                    <div className="social-links">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    &copy; {currentYear} Hearth & Pages. All rights reserved.
                </p>
                <p className="faded">Designed with care.</p>
            </div>
        </footer>
    );
}

export default Footer;