/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* === Endpoints Interacción ===================================================================================================== */
router.get('/dashboard', (req, res) => {
    if (!req.session.loggedin) { return res.redirect('/login'); }

    res.render('dashboard', {
        title: 'Mi sitio web',
        username: req.session.username
    });
});

module.exports = router;