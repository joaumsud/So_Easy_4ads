const mysql = require("../mysql");

exports.getOcorrencias = async (req, res, next) => {
    try {
        const result = await mysql.execute(`SELECT oco_ocorrencia.oco_id, 
        alu_aluno.alu_ra,
        pes_pessoa.pes_nome,
        oco_ocorrencia.oco_resumo,
        oco_ocorrencia.oco_data,
        oco_ocorrencia.oco_ativa
        FROM
        oco_ocorrencia
        INNER JOIN
        alu_aluno
        ON oco_ocorrencia.alu_id = alu_aluno.alu_id
        INNER JOIN
        pes_pessoa
        ON alu_aluno.alu_id = pes_pessoa.pes_id;`);
        const response = {
            quantidade_ocorrencias: result.length,
            ocorrencias: result.map((ocorrencia) => {
                return {
                    id_ocorrencia: ocorrencia.oco_id,
                    aluno_ra: ocorrencia.alu_ra,
                    nome_aluno: ocorrencia.pes_nome,
                    ocorrencia_resumo: ocorrencia.oco_resumo,
                    ocorrencia_data: ocorrencia.oco_data,
                    ocorrencia_ativo: ocorrencia.oco_ativa,
                };
            }),
        };
        return res.status(200).send({ response });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getOcorrenciasPorIdAluno = async (req, res, next) => {
    try {
        const query = `SELECT oco_id,
        oco_resumo,
        oco_data,
        oco_doc_path
        FROM
        oco_ocorrencia
        WHERE alu_id = ?;`;
        const result = await mysql.execute(query, [req.params.id]);
        if (result.length === 0) {
            return res
                .status(500)
                .send({ error: `Ocorrências não encontradas!` });
        }
        const response = {
            quantidade_ocorrencias: result.length,
            ocorrencias: result.map((ocorrencia) => {
                return {
                    oco_id: ocorrencia.oco_id,
                    oco_resumo: ocorrencia.oco_resumo,
                    oco_data: ocorrencia.oco_data,
                    oco_doc_path: ocorrencia.oco_doc_path,
                };
            }),
        };
        return res.status(200).send({ response });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postOcorrencia = async (req, res, next) => {
    try {
        const query = `INSERT INTO
       oco_ocorrencia(oco_resumo, oco_doc_path, oco_data, alu_id)
       VALUES(?,
              ?,
              ?,
              ?);`;
        const result = await mysql.execute(query, [
            req.body.resumo,
            req.file ? req.file.path : "",
            req.body.data,
            req.body.aluno_id,
        ]);
        const response = {
            mensagem: "Ocorrência inserida com sucesso",
            ocorrenciaCriada: {
                id_ocorrencia: result.oco_id,
                resumo: req.body.resumo,
                path: req.file || "",
                data: req.body.data,
                alunoId: req.body.aluno_id,
            },
        };
        return res.status(201).send({ response });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error });
    }
};

exports.updateOcorrencia = async (req, res, next) => {
    try {
        const file_path = await mysql.execute(
            "SELECT oco_doc_path FROM oco_ocorrencia WHERE oco_id=?",
            [req.params.id]
        );

        const query = `UPDATE oco_ocorrencia
        SET oco_resumo = ?,
        oco_doc_path = ?,
        oco_data = ?
        WHERE oco_id = ?;`;
        await mysql.execute(query, [
            req.body.resumo,
            req.file ? req.file.path : file_path[0].oco_doc_path,
            req.body.data,
            req.params.id,
        ]);

        const response = {
            message: `Ocorrência atualizada com sucesso`,
            updateOcorrencia: {
                resumo: req.body.resumo,
                file: req.file ? req.file.path : "",
                data: req.body.data,
            },
        };
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.deleteOcorrencia = async (req, res, next) => {
    try {
        const query = `DELETE FROM oco_ocorrencia WHERE oco_id = ?`;
        await mysql.execute(query, [req.params.id]);
        const response = {
            message: `Ocorrência excluida com sucesso`,
        };
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
