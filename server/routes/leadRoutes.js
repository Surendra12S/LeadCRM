const express = require('express');
const { getLeads, getLead, createLead } = require('../controllers/leadController');

const router = express.Router();

router.route('/')
    .get(getLeads)
    .post(createLead);

router.route('/:id')
    .get(getLead);

module.exports = router;
