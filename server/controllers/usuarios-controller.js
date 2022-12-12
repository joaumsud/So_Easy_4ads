const mysql = require("../mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postCadastro = async (req, res, next) => {
    try {
        query =
            "INSERT INTO usu_usuario(usu_nome,usu_email,usu_senha,usu_nivel_acesso) VALUES (?,?,?,?)";
        const results = await mysql.execute(query, [
            req.body.nome,
            req.body.email,
            bcrypt.hashSync(req.body.senha, 10),
            req.body.nivel_acesso,
        ]);
        const response = {
            mensagem: "Usuário criado com sucesso",
            usuarioCriado: {
                id_usuario: results.insertId,
                email: req.body.email,
            },
        };
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postLogin = async (req, res, next) => {
    try {
        const query = `SELECT * FROM usu_usuario WHERE usu_email = ?`;
        var results = await mysql.execute(query, [req.body.email]);
        if (results.length < 1) {
            return res.status(401).send({ mensagem: "Falha na autenticação" });
        }
        const check_pwd = await bcrypt.compareSync(
            req.body.senha,
            results[0].usu_senha
        );
        if (check_pwd) {
            const token = jwt.sign(
                {
                    userId: results[0].usu_id,
                    email: results[0].usu_email,
                    nivel_acesso: results[0].usu_nivel_acesso,
                },
                process.env.JWT_KEY
            );
            return res.status(200).send({
                message: "Autenticado com sucesso",
                token: token,
                nivel_acesso: results[0].usu_nivel_acesso,
            });
        }
        return res.status(401).send({ message: "Falha na autenticação" });
    } catch (error) {
        return res.status(500).send({ message: "Falha na autenticação" });
    }
};
