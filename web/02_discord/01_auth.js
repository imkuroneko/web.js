/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');

/* ===== Cargar parámetros =============================================================================== */
const discord = require(path.resolve('./data/discord.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/login/discord', (req, res) => {
    if(req.session.fingerprint) { return res.redirect('/dashboard'); }

    const state = crypto.randomBytes(16).toString('hex');

    req.session.state = state;

    const params = new URLSearchParams({
        response_type : 'code',
        client_id     : discord.clientId,
        scope         : discord.scopes.join(' '),
        redirect_uri  : discord.redirectUri,
        state         : state
    });

    const url = `https://discord.com/api/oauth2/authorize?${params}`;
    res.redirect(url);
});

module.exports = router;