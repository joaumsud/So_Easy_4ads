const mysql = require("../mysql");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.postCadastro = async (req, res, next) => {
    try{
        const usuarios = req.body.usuarios.map(user=>[
            user.nome,
            user.email,
            bcrypt.hashSync(user.senha,10),
            user.nivel_de_acesso
        ])
        query = "INSERT INTO USU_USUARIO(usu_nome,usu_email,usu_senha,usu_nivel_acesso) VALUES ?";
        const results = await mysql.execute(query,[usuarios])
        const response = {
            mensagem: "Usuário criado com sucesso",
            usuarioCriado: {
                id_usuario: results.insertId,
                email: req.body.email,
            },
        };
        return res.status(201).send(response);
    }catch(error){
        return res.status(500).send({ error: error });
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const query = `SELECT * FROM usu_usuario WHERE usu_email = ?`
        var results = await mysql.execute(query, [req.body.email])
        if (results.length < 1) {
            return res.status(401).send({ mensagem: "Falha na autenticação" })
        }
        if (await bcrypt.compareSync(req.body.senha, results[0].usu_senha)) {
            const token = jwt.sign({
                userId: results[0].usu_id,
                email: results[0].usu_email
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });
            return res.status(200).send({
                message: 'Autenticado com sucesso',
                token: token
            });
        }
        return res.status(401).send({ message: 'Falha na autenticação' })
    } catch (error) {
        return res.status(500).send({ message: 'Falha na autenticação' });
    }
}

