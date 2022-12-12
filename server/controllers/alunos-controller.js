const mysql = require("../mysql");

exports.getAlunos = async (req, res, next) => {
    try {
        const result = await mysql.execute(
            `
        SELECT 
        alu_aluno.alu_id,
        alu_aluno.alu_ra,
        pes_pessoa.pes_nome, 
        tur_turma.tur_ano, 
        tur_turma.tur_grupo,
        COUNT(oco_ocorrencia.alu_id) as n_ocorrencias
        FROM
        pes_pessoa
        INNER JOIN
        alu_aluno
        ON alu_aluno.pes_id = pes_pessoa.PES_ID
        INNER JOIN
        tur_turma
        ON alu_aluno.tur_id = tur_turma.tur_id
        LEFT JOIN
        oco_ocorrencia
        on alu_aluno.alu_id = oco_ocorrencia.alu_id
        WHERE 
        pes_pessoa.pes_nome LIKE ? OR 
        alu_aluno.alu_ra LIKE ? OR 
        tur_turma.tur_ano LIKE ?
        GROUP BY alu_aluno.alu_id;
      `,
            [
                req.query.search + "%",
                req.query.search + "%",
                req.query.search + "%",
            ]
        );
        const response = {
            quantidade_alunos: result.length,
            alunos: result.map((aluno) => {
                return {
                    alu_id: aluno.alu_id,
                    alu_ra: aluno.alu_ra,
                    alu_nome: aluno.pes_nome,
                    alu_turma:
                        aluno.tur_ano + "º " + aluno.tur_grupo.toUpperCase(),
                    alu_ocorrencias: aluno.n_ocorrencias,
                    alu_declaracoes: aluno.n_declaracoes,
                };
            }),
        };
        return res.status(200).send({ response });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
