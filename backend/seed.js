const db = require('./db');

db.prepare(`
  INSERT INTO tenants (name, prompt, phone_number, forward_number)
  VALUES (?, ?, ?, ?)
`).run(
    'Acme Dental',
    'You are the receptionist for Acme Dental. Greet callers politely, answer common questions, and offer to schedule appointments.',
    '+15556667777',
    '+15558889999'
);

console.log('Seeded tenant: Acme Dental');
