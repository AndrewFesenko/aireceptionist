// routes/admin.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// List tenants
router.get('/tenants', (req, res) => {
    const tenants = db.prepare('SELECT * FROM tenants').all();
    res.render('tenants', { tenants });
});

// Show add tenant form
router.get('/tenants/new', (req, res) => {
    res.render('tenant_new');
});

// Handle new tenant submission
router.post('/tenants/new', (req, res) => {
    db.prepare(`
    INSERT INTO tenants (name, prompt, phone_number, forward_number)
    VALUES (?, ?, ?, ?)
  `).run(req.body.name, req.body.prompt, req.body.phone_number, req.body.forward_number);

    res.redirect('/admin/tenants');
});

// Edit tenant
router.get('/tenants/:id', (req, res) => {
    const t = db.prepare('SELECT * FROM tenants WHERE id=?').get(req.params.id);
    res.render('tenant_edit', { t });
});

// Delete tenant
router.post('/tenants/:id/delete', (req, res) => {
    db.prepare('DELETE FROM tenants WHERE id=?').run(req.params.id);
    res.redirect('/admin/tenants');
});

// Save tenant edits
router.post('/tenants/:id', (req, res) => {
    db.prepare('UPDATE tenants SET name=?, prompt=?, phone_number=?, forward_number=? WHERE id=?')
        .run(req.body.name, req.body.prompt, req.body.phone_number, req.body.forward_number, req.params.id);

    res.redirect('/admin/tenants');
});

module.exports = router;

