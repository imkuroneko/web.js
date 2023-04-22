/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');

/* ===== Cargar parámetros =============================================================================== */
const discord = require(path.resolve('./data/discord.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/auth/discord', (req, res) => {
    if(req.session.user) { return res.redirect('/dashboard'); }

    const state = crypto.randomBytes(16).toString('hex');
    res.cookie('state', state, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    const params = new URLSearchParams({
        client_id     : discord.clientId,
        response_type : 'code',
        scope         : discord.scopes,
        redirect_uri  : discord.redirectUri,
        state         : state
    });

    const url = `https://discord.com/api/oauth2/authorize?${params}`;
    res.redirect(url);
});

module.exports = router;