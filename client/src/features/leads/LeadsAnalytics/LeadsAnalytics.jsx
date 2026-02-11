import React, { useMemo } from 'react';
//import Card, { CardHeader, CardTitle, CardBody } from '../../../components/UI/Card/Card';
import Card, { CardHeader, CardTitle, CardBody } from "../../../components/UI/Card/Card";

import './LeadsAnalytics.css';

const LeadsAnalytics = ({ leads = [] }) => {
    const stats = useMemo(() => {
        const sourceCounts = {
            'Website': 0,
            'Instagram': 0,
            'Referral': 0,
            'Other': 0
        };

        leads.forEach(lead => {
            const source = lead.source || 'Other';
            if (sourceCounts[source] !== undefined) {
                sourceCounts[source]++;
            } else {
                sourceCounts['Other']++;
            }
        });

        // Calculate max value for scaling chart
        const maxCount = Math.max(...Object.values(sourceCounts), 1); // Avoid div by zero

        return {
            sourceCounts,
            maxCount,
            total: leads.length
        };
    }, [leads]);

    if (leads.length === 0) return null;

    return (
        <Card className="analytics-card" style={{ marginBottom: '2rem' }}>
            <CardHeader>
                <CardTitle>Lead Sources Analytics</CardTitle>
            </CardHeader>
            <CardBody>
                <div className="analytics-grid">
                    <div className="analytics-stat-card">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Leads</div>
                    </div>
                </div>

                <div className="chart-container">
                    {Object.entries(stats.sourceCounts).map(([source, count]) => {
                        // Calculate percentage height relative to max value
                        const heightPercentage = Math.round((count / stats.maxCount) * 100);

                        return (
                            <div key={source} className="chart-bar-wrapper">
                                <div className="bar-value">{count}</div>
                                <div
                                    className="chart-bar"
                                    style={{ height: `${heightPercentage}%` }}
                                    title={`${source}: ${count}`}
                                ></div>
                                <div className="bar-label">{source}</div>
                            </div>
                        );
                    })}
                </div>
            </CardBody>
        </Card>
    );
};

export default LeadsAnalytics;
