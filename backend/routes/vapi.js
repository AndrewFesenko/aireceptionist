// routes/vapi.js
const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/webhook', (req, res) => {
    const body = req.body;
    console.log("Webhook hit");
    console.log(JSON.stringify(body, null, 2));

    try {
        // Calls can come from top-level OR inside body.message
        const call = body.call || body.message?.call;
        const customer = body.customer || body.message?.customer;
        const phoneNumber = body.phoneNumber || body.message?.phoneNumber;

        const callId = call?.id;
        const fromNumber = customer?.number;
        const toNumber = phoneNumber?.number;

        console.log("➡ Parsed values:", { callId, fromNumber, toNumber });

        // Insert call if we have the basics
        if (callId && fromNumber && toNumber) {
            db.prepare(`
        INSERT OR IGNORE INTO calls (id, tenant_id, from_number, to_number, status, started_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).run(callId, 1, fromNumber, toNumber, 'in_progress');
        }

        // --- Handle speech updates (only FINAL transcripts) ---
        if (body.message?.type === 'speech-update') {
            const role = body.message.role;
            const status = body.message.status; // "started", "in-progress", "completed"

            // only save final transcripts
            if (status !== 'completed' && status !== 'final') {
                console.log(`⏭ Skipped interim transcript [${status}]`);
                return;
            }

            let text = body.message.text || body.message.message;

            if (!text && Array.isArray(body.message.artifact?.messages)) {
                const last = body.message.artifact.messages.slice(-1)[0];
                text = last?.message || last?.text;
            }

            // Filters
            if (!text) return;
            if (role === 'system') return;
            if (text.startsWith('# Appointment Scheduling')) return;

            // Prevent duplicates
            const exists = db.prepare(`
        SELECT 1 FROM call_turns WHERE call_id=? AND role=? AND text=?
      `).get(callId, role, text);

            if (!exists) {
                db.prepare(`
          INSERT INTO call_turns (call_id, role, text)
          VALUES (?, ?, ?)
        `).run(callId, role, text);
                console.log(`💬 Saved FINAL turn: [${role}] ${text}`);
            } else {
                console.log(`⚠️ Skipped duplicate FINAL: [${role}] ${text}`);
            }
        }

        // --- Handle status updates (end call) ---
        if (body.message?.type === 'status-update' && body.message.status === 'ended') {
            db.prepare(`
                UPDATE calls
                SET status='ended', ended_at=CURRENT_TIMESTAMP
                WHERE id=?
            `).run(callId);
            console.log(`✅ Marked call ${callId} as ended`);
        }

        // --- Handle call analysis (summary) ---
        if (body.message?.type === 'analysis-completed' && body.message.artifact) {
            const summary = body.message.artifact.summary;
            if (summary) {
                db.prepare(`
                    UPDATE calls SET summary=? WHERE id=?
                `).run(summary, callId);
                console.log(`📝 Saved summary for call ${callId}: ${summary}`);
            }
        }

    } catch (err) {
        console.error("Error saving webhook event:", err);
    }

    res.sendStatus(200);
});

module.exports = router;
