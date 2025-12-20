import React from 'react';
import '../styles/SuccessModal.css'; 

const SuccessModal = ({ isOpen, title, message, subMessage }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-icon">✓</div>
                <h3>{title}</h3>
                <p>{message}</p>
                {/* Optional secondary text like "Redirecting..." */}
                {subMessage && <p className="redirect-text">{subMessage}</p>}
            </div>
        </div>
    );
};

export default SuccessModal;