const Resposta = require("../database/resposta");

async function listarTodasRespostas(perguntaId) {
    let listaRespostas = [];

    await Resposta.findAll({
        raw: true,
        where: {perguntaId},
        order: [
            ['createdAt', 'DESC'],
        ]
    }).then(respostas => {
        listaRespostas = respostas;
    });

    return listaRespostas;
}

async function listarRespostasPorPerguntaId(perguntaId) {
    let respostas = [];

    await Resposta.findAll({
        where: {perguntaId},
        order: [['createdAt', 'DESC']]
    }).then(resultado => {
        respostas = resultado;
    });

    return respostas;
}

async function salvarResposta(perguntaId, corpo) {
    if (corpo === undefined || corpo === '' || corpo === null) {
        throw new Error('O campo corpo não pode ser nulo ou vazio');
    }
    await Resposta.create({
        perguntaId,
        corpo
    });
}
module.exports = {
    listarTodasRespostas,
    listarRespostasPorPerguntaId,
    salvarResposta
};