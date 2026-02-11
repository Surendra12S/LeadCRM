import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Select from '../../components/ui/Select/Select';
import Badge from '../../components/ui/Badge/Badge';
import Card from '../../components/ui/Card/Card';
import { useDebounce } from '../../hooks/useDebounce';
import { useToast } from '../../context/ToastContext';
import LeadsAnalytics from './LeadsAnalytics/LeadsAnalytics';
import './LeadsList.css';

const LeadsList = () => {
    const { addToast } = useToast();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);

    // Search & Filter State
    const [search, setSearch] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');

    // Sorting State
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/leads`);
                console.log('API Response:', res.data);

                const leadsData = res.data.data || [];
                setLeads(Array.isArray(leadsData) ? leadsData : []);
                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to fetch leads');
                setLeads([]);
                addToast('Failed to load leads', 'error');
                setLoading(false);
            }
        };

        fetchLeads();
    }, [addToast]);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const copyToClipboard = (text, e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        addToast('Email copied to clipboard', 'success');
    };

    const filteredLeads = useMemo(() => {
        let result = leads.filter(lead => {
            const matchesSearch =
                lead.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                lead.email.toLowerCase().includes(debouncedSearch.toLowerCase());

            const matchesSource = sourceFilter === '' || lead.source === sourceFilter;

            return matchesSearch && matchesSource;
        });

        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [leads, debouncedSearch, sourceFilter, sortConfig]);

    const openModal = (lead) => {
        setSelectedLead(lead);
    };

    const closeModal = () => {
        setSelectedLead(null);
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return <span className="sort-icon">↕</span>;
        return <span className="sort-icon">{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>;
    };

    if (loading) return (
        <Card className="leads-card">
            <div className="leads-header">
                <h2 className="leads-title">Leads Dashboard</h2>
            </div>
            <SkeletonLoader rows={8} />
        </Card>
    );

    if (error) return (
        <div className="error-message">
            {error}
        </div>
    );

    return (
        <Card className="leads-card">
            <div className="leads-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 className="leads-title">Leads Dashboard</h2>
                    <Badge variant="secondary" className="leads-count-badge">
                        {filteredLeads.length} / {leads.length}
                    </Badge>
                </div>
            </div>

            <LeadsAnalytics leads={leads} />

            <div className="leads-controls">
                <div className="search-container">
                    <Input
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-container">
                    <Select
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        options={[
                            { value: '', label: 'All Sources' },
                            { value: 'Website', label: 'Website' },
                            { value: 'Instagram', label: 'Instagram' },
                            { value: 'Referral', label: 'Referral' },
                            { value: 'Other', label: 'Other' }
                        ]}
                        className="source-select"
                    />
                </div>
            </div>

            {filteredLeads.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3 className="empty-title">No leads found</h3>
                    <p className="empty-description">
                        {leads.length === 0
                            ? "Your pipeline is empty. Create your first lead to get started."
                            : "No leads match your search criteria. Try adjusting your filters."
                        }
                    </p>
                    {leads.length === 0 && (
                        <Button href="/leads/new" variant="primary" as="a" className="empty-action-btn">
                            Create Lead
                        </Button>
                    )}
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th
                                    className="leads-table-header sortable-header"
                                    onClick={() => handleSort('name')}
                                >
                                    Name {getSortIndicator('name')}
                                </th>
                                <th
                                    className="leads-table-header sortable-header"
                                    onClick={() => handleSort('email')}
                                >
                                    Contact {getSortIndicator('email')}
                                </th>
                                <th className="leads-table-header">Source</th>
                                <th
                                    className="leads-table-header sortable-header"
                                    onClick={() => handleSort('createdAt')}
                                >
                                    Date {getSortIndicator('createdAt')}
                                </th>
                                <th className="leads-table-header">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeads.map((lead) => (
                                <tr key={lead._id} className="lead-row" onClick={() => openModal(lead)}>
                                    <td>
                                        <div className="lead-name">{lead.name}</div>
                                        {lead.phone && <div className="lead-phone">{lead.phone}</div>}
                                    </td>
                                    <td>
                                        <div className="lead-email-wrapper">
                                            <div className="lead-email">{lead.email}</div>
                                            <button
                                                className="copy-btn"
                                                title="Copy Email"
                                                onClick={(e) => copyToClipboard(lead.email, e)}
                                            >
                                                📋
                                            </button>
                                        </div>
                                        {lead.company && <div className="lead-company">{lead.company}</div>}
                                    </td>
                                    <td>
                                        <Badge variant="primary" className="source-badge">
                                            {lead.source}
                                        </Badge>
                                    </td>
                                    <td className="date-cell">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(lead);
                                            }}
                                        >
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal
                isOpen={!!selectedLead}
                onClose={closeModal}
                title="Lead Details"
            >
                {selectedLead && (
                    <div className="lead-details">
                        <div className="detail-grid">
                            <div className="detail-group">
                                <label className="detail-label">Full Name</label>
                                <div className="detail-value">{selectedLead.name}</div>
                            </div>
                            <div className="detail-group">
                                <label className="detail-label">Email Address</label>
                                <div className="lead-email-wrapper">
                                    <div className="detail-value">{selectedLead.email}</div>
                                    <button
                                        className="copy-btn"
                                        style={{ opacity: 1 }}
                                        title="Copy Email"
                                        onClick={(e) => copyToClipboard(selectedLead.email, e)}
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                            <div className="detail-group">
                                <label className="detail-label">Phone</label>
                                <div className="detail-value">{selectedLead.phone || '-'}</div>
                            </div>
                            <div className="detail-group">
                                <label className="detail-label">Company</label>
                                <div className="detail-value">{selectedLead.company || '-'}</div>
                            </div>
                            <div className="detail-group">
                                <label className="detail-label">Source</label>
                                <Badge variant="primary">{selectedLead.source}</Badge>
                            </div>
                            <div className="detail-group">
                                <label className="detail-label">Date</label>
                                <div className="detail-value">
                                    {new Date(selectedLead.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {selectedLead.message && (
                            <div className="detail-group" style={{ marginTop: '1.5rem' }}>
                                <label className="detail-label">Message</label>
                                <div className="message-box">
                                    {selectedLead.message}
                                </div>
                            </div>
                        )}

                        <div className="detail-footer">
                            Leaf ID: {selectedLead._id}
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default LeadsList;
