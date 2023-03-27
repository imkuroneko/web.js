/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* === Endpoints Interacción ===================================================================================================== */
router.get('/login', (req, res) => {
    if (req.session.loggedin) { return res.redirect('/dashboard'); }

    res.render('login', {
        title: 'Mi sitio web',
    });
});

module.exports = router;