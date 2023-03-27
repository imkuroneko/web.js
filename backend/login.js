/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* === Endpoints Interacción ===================================================================================================== */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'pass') {
        req.session.loggedin = true;
        req.session.username = username;
        res.redirect('/dashboard');
    } else {
        res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
});

module.exports = router;