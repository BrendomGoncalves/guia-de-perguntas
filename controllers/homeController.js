const { listarTodasPerguntas } = require('../services/perguntaService');

const HomeController = {
    index: async (req, res, next) => {
        try {
            const response = await listarTodasPerguntas();
            res.status(200).render('index', {
                perguntas: response.listaPerguntas,
                numeroDePerguntas: response.numeroDePerguntas
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = HomeController;