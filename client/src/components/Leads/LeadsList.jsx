import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../UI/Spinner';
import Modal from '../UI/Modal';

const LeadsList = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await axios.get('/api/leads');
            setLeads(res.data.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch leads');
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const openDetails = (lead) => {
        setSelectedLead(lead);
    };

    const closeDetails = () => {
        setSelectedLead(null);
    };

    if (loading) return <Spinner />;

    if (error) return (
        <div style={{ textAlign: 'center', color: 'var(--error-color)', marginTop: '2rem' }}>
            {error}
        </div>
    );

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Leads Dashboard</h2>
                <span style={{
                    background: '#f1f5f9',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                }}>
                    Total: {leads.length}
                </span>
            </div>

            {leads.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>No leads found. Create one to get started!</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Source</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr
                                    key={lead._id}
                                    style={{ cursor: 'pointer', transition: 'background-color 0.1s' }}
                                    onClick={() => openDetails(lead)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ fontWeight: 500 }}>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.75rem',
                                            backgroundColor: '#e0e7ff',
                                            color: '#4338ca',
                                            fontWeight: 500
                                        }}>
                                            {lead.source}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {formatDate(lead.createdAt)}
                                    </td>
                                    <td>
                                        <button className="btn" style={{
                                            padding: '0.25rem 0.5rem',
                                            fontSize: '0.8rem',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedLead && (
                <Modal
                    isOpen={!!selectedLead}
                    onClose={closeDetails}
                    title="Lead Details"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                            <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{selectedLead.name}</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
                                <div>{selectedLead.email}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</label>
                                <div>{selectedLead.phone || '-'}</div>
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                            <div>{selectedLead.company || '-'}</div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</label>
                            <div>{selectedLead.source}</div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message</label>
                            <div style={{
                                backgroundColor: '#f8fafc',
                                padding: '0.75rem',
                                borderRadius: '0.375rem',
                                border: '1px solid #e2e8f0',
                                minHeight: '60px'
                            }}>
                                {selectedLead.message || 'No message provided.'}
                            </div>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Created on {formatDate(selectedLead.createdAt)}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default LeadsList;
