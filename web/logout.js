/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* === Endpoints Interacción ===================================================================================================== */
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;