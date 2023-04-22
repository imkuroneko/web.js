/* ===== Cargar módulos ================================================================================== */
const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const glob = require('glob');

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
app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

/* ===== Configuración session =========================================================================== */
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

/* ===== Cargar módulos ================================================================================== */
try {
    (async () => {
        const listEndpoints = (glob.sync('./web/**/*.js')).sort();
        listEndpoints.forEach((endpoint) => {
            const relativePath = path.relative(__dirname, endpoint);
            app.use(require('./' + relativePath));
        });
    })();
} catch (error) {
    console.error('[load:endpoints]', error);
}

/* ===== Levantar servidor =============================================================================== */
app.listen(config.expressPort, () => {
    console.log(`proyecto operativo en puerto: ${config.expressPort}`);
});
