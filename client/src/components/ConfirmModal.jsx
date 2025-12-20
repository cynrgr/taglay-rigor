import React from 'react';
import '../styles/SuccessModal.css'; // Reusing the popup styles

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                {/* Warning Icon (Exclamation Mark) */}
                <div className="popup-icon" style={{backgroundColor: '#e53e3e'}}>
                    !
                </div>
                
                <h3>{title}</h3>
                <p>{message}</p>
                
                <div className="modal-actions">
                    <button 
                        onClick={onClose} 
                        className="modal-btn cancel"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="modal-btn confirm"
                    >
                        Yes, Burn It
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;