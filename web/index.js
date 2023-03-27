/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* === Endpoints Interacción ===================================================================================================== */
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Mi sitio web'
    });
});

module.exports = router;