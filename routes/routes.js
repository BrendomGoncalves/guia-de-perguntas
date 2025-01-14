const routes = require('express').Router();
const homeController = require('../controllers/HomeController');
const perguntaController = require('../controllers/PerguntaController');
const respostaController = require('../controllers/RespostaController');

// Home
routes.get('/', homeController.index);

// Perguntas
routes.get('/perguntar', perguntaController.perguntar);
routes.post('/salvar-pergunta', perguntaController.salvarPergunta);
routes.get('/pergunta/:id', perguntaController.pergunta);

// Respostas
routes.post('/responder', respostaController.salvarResposta);

// Padrão
routes.get('/**', (req, res) => {
    res.render('notFound');
});

module.exports = routes;