const mysql = require("../mysql");

exports.getAlunos = async (req, res, next) => {
    try {
        const result = await mysql.execute(`
        SELECT 
        ALU_ALUNO.ALU_RA, 
        PES_PESSOA.PES_NOME, 
        TUR_TURMA.TUR_ANO, 
        TUR_TURMA.TUR_GRUPO
        FROM
        PES_PESSOA
        INNER JOIN
        ALU_ALUNO
        ON ALU_ALUNO.PES_ID = PES_PESSOA.PES_ID
        INNER JOIN
        TUR_TURMA
        ON ALU_ALUNO.TUR_ID = TUR_TURMA.TUR_ID
        WHERE 
        ALU_ALUNO.ALU_RA = ? OR 
        PES_PESSOA.PES_NOME = ? OR 
        TUR_TURMA.TUR_ANO = ?;
      `,
            [req.body.aluno_ra, req.body.aluno_nome, req.body.aluno_turma])
        const response = {
            quantidade_alunos: result.length,
            alunos: result.map((alunos) => {
                return {
                    aluno_ra: alunos.ALU_RA,
                    aluno_nome: alunos.PES_NOME,
                    aluno_turma: alunos.TUR_ANO + alunos.TUR_GRUPO
                }
            })
        }
        return res.status(200).send({ response });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}