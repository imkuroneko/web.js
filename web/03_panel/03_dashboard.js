/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const path = require('path');

/* ===== Funciones propias ======================================================================================================= */
const { checkAuthentication } = require(path.resolve('./functions/auth'));

/* ===== Cargar parámetros ======================================================================================================= */
const { website } = require(path.resolve('./data/conf.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/dashboard', checkAuthentication, (req, res) => {
    if(!req.session.fingerprint) { return res.redirect('/login'); }

    res.render('panel/dashboard', {
        title: website.name,
        username: req.session.username
    });
});

module.exports = router;