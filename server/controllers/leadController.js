const Lead = require('../models/Lead');
const axios = require('axios');

// @desc    Get all leads
// @route   GET /leads
// @access  Public
exports.getLeads = async (req, res, next) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single lead
// @route   GET /leads/:id
// @access  Public
exports.getLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }
        res.status(200).json({ success: true, data: lead });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new lead
// @route   POST /leads
// @access  Public
exports.createLead = async (req, res, next) => {
    try {
        const lead = await Lead.create(req.body);

        // Webhook integration
        let webhookStatus = 'Not Sent';
        if (process.env.WEBHOOK_URL) {
            try {
                await axios.post(process.env.WEBHOOK_URL, {
                    name: lead.name,
                    email: lead.email,
                    source: lead.source,
                    created_at: lead.createdAt
                });
                webhookStatus = 'Success';
            } catch (webhookErr) {
                console.error('Webhook Error:', webhookErr.message);
                webhookStatus = 'Failed';
            }
        }

        res.status(201).json({
            success: true,
            data: lead,
            webhook: webhookStatus
        });
    } catch (err) {
        next(err);
    }
};
