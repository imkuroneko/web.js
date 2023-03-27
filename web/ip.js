/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* === Endpoints Interacción ===================================================================================================== */
router.get('/ip', (req, res) => {
    res.render('index');
    const ipAddress = req.socket.remoteAddress;
    res.set('Connection', 'close');
    res.json({ status: true, requestId: uuidv4(), msg: ipAddress });
    return;
});

module.exports = router;