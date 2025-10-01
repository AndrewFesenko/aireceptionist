require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const telephonyRoutes = require('./routes/telephony');
const callsRoutes = require('./routes/calls');
const vapiRoutes = require('./routes/vapi');   // load routes first

const app = express();  // initialize app HERE

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register routes AFTER app is created
app.use('/admin', adminRoutes);
app.use('/telephony', telephonyRoutes);
app.use('/admin/calls', callsRoutes);
app.use('/vapi', vapiRoutes);

app.get('/', (req, res) => res.send('Receptionist API running.'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const db = require('./db');

app.get('/debug-tenants', (req, res) => {
    const tenants = db.prepare('SELECT * FROM tenants').all();
    res.json(tenants);
});
