import React from 'react';
import './Select.css';

const Select = ({
    label,
    options = [],
    value,
    onChange,
    error,
    className = '',
    placeholder,
    ...props
}) => {
    return (
        <div className="select-wrapper">
            {label && <label className="select-label">{label}</label>}
            <select
                className={`select-field ${error ? 'select-error' : ''} ${className}`}
                value={value}
                onChange={onChange}
                {...props}
            >
                {placeholder && <option value="" disabled>{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default Select;
