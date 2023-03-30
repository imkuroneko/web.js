/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const path = require('path');

/* ===== Cargar parámetros ======================================================================================================= */
const { website } = require(path.resolve('./data/conf.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/dashboard', (req, res) => {
    if(!req.session) { return res.redirect('/login'); }

    res.render('panel/dashboard', {
        title: website.name,
        username: req.session.username
    });
});

module.exports = router;