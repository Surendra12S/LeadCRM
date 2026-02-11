import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ rows = 5 }) => {
    return (
        <div className="skeleton-wrapper">
            {[...Array(rows)].map((_, index) => (
                <div key={index} className="skeleton-row">
                    <div className="skeleton-block" style={{ width: '25%' }}></div>
                    <div className="skeleton-block" style={{ width: '30%' }}></div>
                    <div className="skeleton-block" style={{ width: '15%' }}></div>
                    <div className="skeleton-block" style={{ width: '15%' }}></div>
                    <div className="skeleton-block" style={{ width: '10%' }}></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
