import React from 'react';
import './Input.css';

const Input = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="input-wrapper">
            {label && <label className="input-label">{label}</label>}
            <input
                className={`input-field ${error ? 'input-error' : ''} ${className}`}
                {...props}
            />
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default Input;
