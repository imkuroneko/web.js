/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

/* ===== Cargar parámetros ======================================================================================================= */
const { website } = require(path.resolve('./data/conf.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.get('/assets/*', (req, res) => {
    return res.status(404).send('Not found');
});

router.get('/*', (req, res) => {
    res.status(404).render('public/error', {
        web_title: `HTTP 404 Not Found | ${website.name}`,
        title: "HTTP 404 Not Found",
        message: "The address doesn't exist."
    });
});

module.exports = router;