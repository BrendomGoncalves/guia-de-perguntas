const respostaService = require("../services/respostaService");

const respostaController = {
    salvarResposta: async (req, res, next) => {
        try {
            let _corpo = req.body.corpo;
            let _perguntaId = req.body.perguntaId;

            if (!_corpo) {
                return res.redirect('/pergunta/' + _perguntaId);
            } else {
                await respostaService.salvarResposta(_perguntaId, _corpo);
                return res.redirect('/pergunta/' + _perguntaId);
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = respostaController;