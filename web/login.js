/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const path = require('path');

/* ===== Cargar parámetros ======================================================================================================= */
const { website } = require(path.resolve('./data/conf.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/login', (req, res) => {
    if (req.session.loggedin) { return res.redirect('/dashboard'); }

    res.render('login', {
        title: website.name
    });
});

module.exports = router;