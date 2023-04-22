/* === Dependencias ============================================================================================================== */
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/* ===== Cargar parámetros =============================================================================== */
const discord = require(path.resolve('./data/discord.json'));
const { website } = require(path.resolve('./data/conf.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/auth/discord/callback', async (req, res) => {
    if(req.session.user) { return res.redirect('/dashboard'); }

    try {
        const { code, state } = req.query;
        const storedState = req.session.state;

        if (!code) {
            return res.status(400).send('Missing authorization code');
        }

        if (state !== storedState) {
            return res.status(403).send('CSRF token mismatch');
        }


        const postHeader = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };

        const postParams = {
            grant_type      : 'authorization_code',
            client_id       : discord.clientId,
            client_secret   : discord.clientSecret,
            redirect_uri    : discord.redirectUri,
            code,
        };

        axios.post('https://discord.com/api/v10/oauth2/token', postParams, postHeader).then((resultPost) => {
            const accessToken = resultPost.data.access_token;

            const getParams = {
                headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
            };

            axios.get('https://discord.com/api/v10/users/@me', getParams).then((resultGet) => {
                const { id, username, discriminator } = resultGet.data;

                // Crear una sesión para el usuario
                req.session.state         = null;
                req.session.fingerprint   = bcrypt.hashSync(id, 10);
                req.session.userId        = id;
                req.session.username      = username;
                req.session.discriminator = discriminator;

                return res.redirect('/dashboard');
            }).catch((error) => {
                console.error(' ===== GET ============================================================');
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                    content = "Error during request";
                } else if (error.request) {
                    console.error(error.request);
                    content = "No response received";
                } else {
                    console.error(error.message);
                    content = "Error during request setup";
                }

                return res.status(500).render('public/error', {
                    web_title: `HTTP 500 Internal server error | ${website.name}`,
                    title: "HTTP 500 Internal server error",
                    message: `There was an issue handling your request. ${content}`,
                    error_uid: uuidv4()
                });
            });
        }).catch((error) => {
            console.error(' ===== POST ===========================================================');
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
                content = "Error during request";
            } else if (error.request) {
                console.error(error.request);
                content = "No response received";
            } else {
                console.error(error.message);
                content = "Error during request setup";
            }

            return res.status(500).render('public/error', {
                web_title: `HTTP 500 Internal server error | ${website.name}`,
                title: "HTTP 500 Internal server error",
                message: `There was an issue handling your request. ${content}`,
                error_uid: uuidv4()
            });
        });
    } catch (error) {
        console.error(' ===== MAIN ===========================================================');
        if (error.response) {
            console.error(error.response.data);
            console.error(error.response.status);
            console.error(error.response.headers);
            content = "Error during request";
        } else if (error.request) {
            console.error(error.request);
            content = "No response received";
        } else {
            console.error(error.message);
            content = "Error during request setup";
        }

        return res.status(500).render('public/error', {
            web_title: `HTTP 500 Internal server error | ${website.name}`,
            title: "HTTP 500 Internal server error",
            message: `There was an issue handling your request. ${content}`,
            error_uid: uuidv4()
        });
    }
});

module.exports = router;