import React, { useEffect, useState } from 'react';
import './Toast.css';

const ICONS = {
    success: '✔',
    error: '✖',
    info: 'ℹ'
};

const Toast = ({ id, message, type = 'info', onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 5000); // Auto hide after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300); // Wait for animation
    };

    return (
        <div className={`toast toast-${type} ${isExiting ? 'exiting' : ''}`}>
            <div className="toast-icon">
                {ICONS[type]}
            </div>
            <div className="toast-message">
                {message}
            </div>
            <button className="toast-close" onClick={handleClose}>
                &times;
            </button>
        </div>
    );
};

export default Toast;
