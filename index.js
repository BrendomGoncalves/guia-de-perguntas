const express = require('express'); // Importando o express
const app = express(); // Inicializando o express
const routes = require('./routes/routes'); // Importando as rotas
const bodyParser = require("body-parser"); // Importando os middlewares

// Configurações //
app.set('view engine', 'ejs'); // Setando o motor de visualização para EJS
app.use(express.static('public')); // Setando a pasta public como pasta de arquivos estáticos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use((req, res, next) => {
    res.locals.url = req.originalUrl;
    next();
});

// Rotas //
app.use('/', routes);

// Inicializando o servidor //
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
})