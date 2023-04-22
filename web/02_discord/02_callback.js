/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const path = require('path');

/* ===== Cargar parámetros =============================================================================== */
const discord = require(path.resolve('./data/discord.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/auth/discord/callback', (req, res) => {
    if(req.session.user) { return res.redirect('/dashboard'); }

    const { code, state } = req.query;
    const storedState = req.cookies.state;

    if (state !== storedState) {
        res.status(403).send('CSRF token mismatch');
        return;
    }

    res.clearCookie('state');
    const data = new URLSearchParams({
        client_id       : discord.clientId,
        client_secret   : discord.clientSecret,
        grant_type      : 'authorization_code',
        code            : code,
        redirect_uri    : discord.redirectUri,
        scope           : discord.scopes
    });

    const options = {
        method: 'POST',
        hostname: 'discord.com',
        path: '/api/oauth2/token',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const reqToken = https.request(options, (resToken) => {
        let body = '';
        resToken.on('data', (chunk) => { body += chunk; });

        resToken.on('end', () => {
            // aqui se parsea toda la información recibida
            // y se debe agregar el control de si está o no en el guild y si tiene o no el rol necesario
            const { access_token } = JSON.parse(body);
            res.send(`Token de acceso: ${access_token}`);
        });
    });

    reqToken.on('error', (error) => {
        console.error(error);
        res.status(500).send('Error al solicitar el token de acceso');
    });

    reqToken.write(data.toString());
    reqToken.end();
});

module.exports = router;