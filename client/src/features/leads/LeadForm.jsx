import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import Card, { CardHeader, CardTitle, CardBody } from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';
import Select from '../../components/ui/Select/Select';
import { useToast } from '../../context/ToastContext';
import './LeadForm.css';

const LeadForm = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        source: 'Website'
    });
    const [loading, setLoading] = useState(false);

    const { name, email, phone, company, message, source } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic Validation
        if (!name || !email) {
            setLoading(false);
            addToast('Name and Email are required', 'error');
            return;
        }

        try {
            await axios.post('/api/leads', formData);
            setLoading(false);
            addToast('Lead created successfully', 'success');

            // Redirect after short delay
            setTimeout(() => {
                navigate('/leads');
            }, 1000);

        } catch (err) {
            setLoading(false);
            const errorMsg = err.response?.data?.error || 'Something went wrong';
            addToast(errorMsg, 'error');
        }
    };

    if (loading) return <Spinner />;

    return (
        <Card className="lead-form-card">
            <CardHeader>
                <CardTitle>Create New Lead</CardTitle>
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmit}>
                    <Input
                        label="Full Name *"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="John Doe"
                        required
                        autoFocus
                    />

                    <Input
                        label="Email Address *"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="john@example.com"
                        required
                    />

                    <div className="form-row">
                        <Input
                            label="Phone Number"
                            name="phone"
                            value={phone}
                            onChange={onChange}
                            placeholder="[ +91 ] [ phone number ]"
                        />

                        <Input
                            label="Company"
                            name="company"
                            value={company}
                            onChange={onChange}
                            placeholder="Reach Skyline"
                        />
                    </div>

                    <Select
                        label="Source"
                        name="source"
                        value={source}
                        onChange={onChange}
                        options={[
                            { value: 'Website', label: 'Website' },
                            { value: 'Instagram', label: 'Instagram' },
                            { value: 'Referral', label: 'Referral' },
                            { value: 'Other', label: 'Other' }
                        ]}
                    />

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

                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        className="submit-btn"
                    >
                        {loading ? 'Saving...' : 'Submit Lead'}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default LeadForm;
