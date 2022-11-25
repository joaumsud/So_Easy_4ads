const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

exports.postCadastro = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
        
        conn.query("SELECT * FROM usu_usuario WHERE usu_email = ?", 
                    [req.body.email], 
                    (error, results) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length > 0) {
                res.status(409).send({ mensagem: "Usuario já cadastrado" })
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) {
                        return res.status(500).send({ error: errBcrypt });
                    }
                    conn.query(
                        "INSERT INTO USU_USUARIO(usu_nome,usu_email,usu_senha,usu_nivel_acesso) VALUES(?,?,?,?)",
                        [req.body.nome,req.body.email,hash,req.body.nivel_de_acesso],
                        (error, results) => {
                            conn.release();
                            if (error) {
                                return res.status(500).send({ error: error });
                            }
                            const response = {
                                mensagem: "Usuário criado com sucesso",
                                usuarioCriado: {
                                    id_usuario: results.insertId,
                                    email: req.body.email,
                                },
                            };
                            return res.status(201).send(response);
                        }
                    );
                });
            }
        })
    });
}

exports.postLogin = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM usu_usuario WHERE usu_email = ?`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release()
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: "Falha na autenticação" })
            }
            bcrypt.compare(req.body.senha, results[0].usu_senha, (err, result) => {
                if (err) {
                    return res.status(401).send({ mensagem: "Falha na autenticação" })
                }
                if (results) {
                    const token = jwt.sign({
                        id_usuario: results[0].usu_id,
                        email: results[0].usu_email
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1d"
                        })

                    return res.status(200).send({
                        mensagem: "Autenticado com sucesso",
                        token: token,
                        nivel_acesso: results[0].usu_nivel_acesso
                    })
                }
                return res.status(401).send({ mensagem: "Falha na autenticação" })
            })
        })
    })
}
