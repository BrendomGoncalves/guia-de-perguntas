const Pergunta = require('../database/pergunta');

async function listarTodasPerguntas() {
    let numeroDePerguntas = 0;
    let listaPerguntas = [];

    await Pergunta
        .findAll({
            raw: true,
            order: [
                ['createdAt', 'DESC'],
            ]
        }).then(perguntas => {
            listaPerguntas = perguntas
            numeroDePerguntas = perguntas.length;
        })

    return {
        listaPerguntas,
        numeroDePerguntas
    }
}

async function buscarPerguntaPorId(id) {
    let pergunta = {};

    await Pergunta
        .findOne({
            raw: true,
            where: {id}
        }).then(resultado => {
            pergunta = resultado;
        });

    return pergunta;
}

async function salvarPergunta(titulo, descricao) {
    await Pergunta
        .create({
            titulo,
            descricao
        });
}

module.exports = { listarTodasPerguntas, buscarPerguntaPorId, salvarPergunta };