/* === Dependencias ============================================================================================================== */
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const mysql = require('mysql');
const path = require('path');
const bcrypt = require('bcrypt');

/* ===== Cargar parámetros ======================================================================================================= */
const { website, db } = require(path.resolve('./data/conf.json'));

/* === Endpoints Interacción ===================================================================================================== */
router.post('/login', async (req, res) => {

    // controlar que no esté logueado

    try {
        const { username, password } = req.body;

        // controlar recepción de username
        // controlar recepción de password

        // crear función de sanitización para username (keep: A-Z 0-9 _)

        const conn = mysql.createConnection({
            host:     db.host,
            port:     db.port,
            user:     db.user,
            password: db.pass,
            database: db.name
        });

        try {
            conn.connect((error) => {
                if(error) { conn.end(); throw error; }
                try {
                    conn.query(` SELECT usuario, email, nom_ape, pass FROM usuarios WHERE usuario = ${mysql.escape(username)}; `, (error, rst, _fields) => {
                        if(error) { throw error; }
                        conn.end();

                        if(!rst.length) {
                            return res.render('login', { title: website.name, error: "Usuario o contraseña incorrectos." });
                        }
            
                        if(!bcrypt.compareSync(password, rst[0].pass)) {
                            return res.render('login', { title: website.name, error: "Usuario o contraseña incorrectos." });
                        }

                        req.session.user = rst[0].usuario;
                        req.session.mail = rst[0].email;
                        req.session.name = rst[0].nom_ape;
                        req.session.fingerprint = '';      // por agregar

                        return res.redirect('/dashboard');
                    });
                } catch (error) {
                    console.error('backend:login:query', error.message);
                }    
            });
        } catch (error) {
            console.error('backend:login:conn', error.message);
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        // hashedPassword >> save on bd
    } catch (error) {
        console.error('backend:login:catch', error.message);
    }
});

module.exports = router;