/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();

/* === Endpoints Interacción ===================================================================================================== */
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;