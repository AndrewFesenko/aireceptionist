const express = require('express');
const router = express.Router();

router.post('/voice', (req, res) => {
    res.send('Voice webhook received');
});

module.exports = router;
