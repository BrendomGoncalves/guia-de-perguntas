const perguntaService = require('../services/perguntaService');
const respostaService = require('../services/respostaService');

const perguntaController = {
    perguntar: async (req, res, next) => {
        try{
            res.render('perguntar');
        } catch (error) {
            return next(error);
        }
    },
    salvarPergunta: async (req, res, next) => {
        try{
            const _titulo = req.body.titulo;
            const _descricao = req.body.descricao;

            await perguntaService.salvarPergunta(_titulo, _descricao);

            res.redirect('/');
        } catch (error) {
            return next(error);
        }
    },
    pergunta: async (req, res, next) => {
        const id = req.params.id;

        if (isNaN(id) && id === undefined) {
            res.redirect('/');
        } else {
            try {
                let _pergunta = await perguntaService.buscarPerguntaPorId(id);
                let _respostas = await respostaService.listarRespostasPorPerguntaId(id);

                res.render('pergunta', {
                    pergunta: _pergunta,
                    respostas: _respostas
                });
            } catch (error) {
                return next(error);
            }
        }
    }
}

module.exports = perguntaController;