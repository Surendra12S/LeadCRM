import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../UI/Spinner';

const LeadForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        source: 'Website'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const { name, email, phone, company, message, source } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic Validation
        if (!name || !email) {
            setLoading(false);
            setError('Name and Email are required');
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/leads`, formData);
            setLoading(false);
            setSuccess(true);

            // Check for webhook status if needed, but primary goal is lead saved
            console.log('Lead saved:', res.data);

            // Redirect after short delay to show success message
            setTimeout(() => {
                navigate('/leads');
            }, 1500);

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    const inputStyle = { marginBottom: '1rem' };

    if (loading && !success) return <Spinner />;

    return (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                Create New Lead
            </h2>

            {error && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            {success && (
                <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#dcfce7',
                    color: '#15803d',
                    borderRadius: '0.375rem',
                    marginBottom: '1rem',
                    textAlign: 'center'
                }}>
                    Lead created successfully! Redirecting...
                </div>
            )}

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="form-control"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="form-control"
                        placeholder="john@example.com"
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            className="form-control"
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={company}
                            onChange={onChange}
                            className="form-control"
                            placeholder="Acme Inc."
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Source</label>
                    <select
                        name="source"
                        value={source}
                        onChange={onChange}
                        className="form-control"
                    >
                        <option value="Website">Website</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                        name="message"
                        value={message}
                        onChange={onChange}
                        className="form-control"
                        rows="4"
                        placeholder="Additional notes..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                    disabled={loading || success}
                    style={{ width: '100%', padding: '0.75rem' }}
                >
                    {loading ? 'Saving...' : 'Submit Lead'}
                </button>
            </form>
        </div>
    );
};

export default LeadForm;
