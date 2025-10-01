// routes/calls.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// List all calls
router.get('/', (req, res) => {
    const calls = db.prepare('SELECT * FROM calls ORDER BY started_at DESC').all();
    res.render('calls', { calls });
});

// Show call details with transcript
router.get('/:id', (req, res) => {
    const call = db.prepare('SELECT * FROM calls WHERE id=?').get(req.params.id);
    const turns = db.prepare('SELECT * FROM call_turns WHERE call_id=? ORDER BY id ASC').all(req.params.id);
    res.render('call_show', { call, turns });
});

// Show call details with transcript
router.get('/:id', (req, res) => {
    const call = db.prepare('SELECT * FROM calls WHERE id=?').get(req.params.id);
    const turns = db.prepare('SELECT * FROM call_turns WHERE call_id=? ORDER BY id ASC').all(req.params.id);
    res.render('call_show', { call, turns });
});

module.exports = router;
