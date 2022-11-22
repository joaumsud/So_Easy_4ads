const jwt = require('jsonwebtoken')

exports.obrigatorio = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.usuario = decode
        next()
    } catch (error) {
        return res.status(401).send({ mensagem: "Falha na autenticação" })
    }
}

exports.nivelAdm = (req, res, next) => {
    const nivelAcesso = results[0].usu_nivel_acesso
    if (nivelAcesso == "1") {
        next();
    } else {
        return res.status(401).send({ mensagem: "Falha ao acessar a página" })
    }
}