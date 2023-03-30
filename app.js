/* ===== Cargar módulos ================================================================================== */
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');

/* ===== Cargar parámetros =============================================================================== */
const config = require(path.resolve('./data/conf.json'));

/* ===== Crear instancia expressJs ======================================================================= */
const app = express();

/* ===== Configurar uso de Mustache ====================================================================== */
app.set('views', __dirname+'/views');
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

/* ===== Definir carpeta para recursos estáticos ========================================================= */
app.use(express.static(__dirname + '/public'));

/* ===== Otras configuraciones del proyecto ============================================================== */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/* ===== Configuración session =========================================================================== */
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

/* ===== Cargar módulos ================================================================================== */
try {
    app.use(require(path.resolve('./web/public/index')));
    app.use(require(path.resolve('./web/public/ip')));

    app.use(require(path.resolve('./web/panel/login')));
    app.use(require(path.resolve('./web/panel/logout')));
    app.use(require(path.resolve('./web/panel/dashboard')));

    app.use(require(path.resolve('./backend/login')));

    app.use(require(path.resolve('./web/default')));
} catch (error) {
    console.error('[load:endpoints]', error);
}

/* ===== Levantar servidor =============================================================================== */
app.listen(config.expressPort, () => {
    console.log(`proyecto operativo en puerto: ${config.expressPort}`);
});
