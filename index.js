const express = require('express'); // Importando o express
const app = express(); // Inicializando o express
const bodyParser = require('body-parser'); // Importando o body-parser
const connection = require("./database/database"); // Importando a conexão com o banco de dados
const Pergunta = require("./database/pergunta"); // Importando o model de pergunta
const Resposta = require("./database/resposta"); // Importando o model de resposta

// Database
connection.authenticate().then(() => {
    console.log('Conexão com o banco de dados feita com sucesso!');
}).catch((error) => {
    console.log(error);
})

// Configurações
app.set('view engine', 'ejs'); // Setando o motor de visualização para EJS
app.use(express.static('public')); // Setando a pasta public como pasta de arquivos estáticos
app.use(express.static('node_modules')); // Setando a pasta node_modules como pasta de arquivos estáticos
app.use(bodyParser.urlencoded({extended: false})); // Configurando o body-parser
app.use(bodyParser.json()); // Configurando o body-parser

// Middleware para adicionar a URL atual ao objeto res.locals
app.use((req, res, next) => {
    res.locals.url = req.originalUrl;
    next();
});

// Rotas

// Rota para listar todas as perguntas
app.get('/', (req, res) => {
    let numeroDePerguntas = 0;
    Pergunta.findAll({
        raw: true, order: [
            ['createdAt', 'DESC'],
        ]
    }).then(perguntas => {
        numeroDePerguntas = perguntas.length;
        res.render('index', {
            perguntas: perguntas,
            numeroDePerguntas: numeroDePerguntas
        });
    }).catch((error) => {
        console.log(error);
    });
});

// Rota para criar pergunta
app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});

// Rota para salvar a pergunta no banco de dados
app.post('/salvarpergunta', (req, res) => {
    let _titulo = req.body.titulo;
    let _descricao = req.body.descricao;

    Pergunta.create({
        titulo: _titulo,
        descricao: _descricao
    }).then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error);
    });
})

// Rota para salvar a resposta no banco de dados
app.post('/salvarresposta', (req, res) => {
    let _corpo = req.body.corpo;
    let _perguntaId = req.body.perguntaId;

    if (_corpo === undefined || _corpo === '' || _corpo === null) {
        res.redirect('/perguntas/' + _perguntaId);
    } else {
        Resposta.create({
            corpo: _corpo,
            perguntaId: _perguntaId
        }).then(() => {
            res.redirect('/perguntas/' + _perguntaId);
        }).catch((error) => {
            console.log(error);
        });
    }
})

app.get('/perguntas/:id', (req, res) => {
    const id = req.params.id;

    // Verificando se o ‘id’ é um número
    if (isNaN(id) && id === undefined) {
        res.redirect('/');
    } else {
        Pergunta.findOne({
            where: {id: id}
        }).then(pergunta => {
            if (pergunta !== undefined) {
                Resposta.findAll({
                    where: {perguntaId: pergunta.id},
                    order: [['createdAt', 'DESC']]
                }).then(respostas => {
                    res.render('pergunta', {
                        pergunta: pergunta,
                        respostas: respostas
                    });
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                res.redirect('/');
            }
        }).catch((error) => {
            console.log(error);
        });
    }
});

// Rota para direcionar erros de rotas não encontradas
app.get('/**', (req, res) => {
    res.status(404).render('notFound');
});

// Inicializando o servidor
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
})