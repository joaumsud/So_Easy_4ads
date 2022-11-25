const mysql = require("../mysql");

exports.getOcorrencias = async (req, res, next) => {
    try {
        const result = await mysql.execute(`SELECT OCO_OCORRENCIA.oco_id, 
        ALU_ALUNO.alu_ra,
        PES_PESSOA.pes_nome,
        OCO_OCORRENCIA.oco_resumo,
        OCO_OCORRENCIA.oco_data,
        OCO_OCORRENCIA.oco_ativa
        FROM
        OCO_OCORRENCIA
        INNER JOIN
        ALU_ALUNO
        ON OCO_OCORRENCIA.alu_id = ALU_ALUNO.alu_id
        INNER JOIN
        PES_PESSOA
        ON ALU_ALUNO.alu_id = PES_PESSOA.pes_id;`)
        const response = {
            quantidade_ocorrencias: result.length,
            ocorrencias: result.map((ocorrencia) => {
                return {
                    id_ocorrencia: ocorrencia.oco_id,
                    aluno_ra: ocorrencia.alu_ra,
                    nome_aluno: ocorrencia.pes_nome,
                    ocorrencia_resumo: ocorrencia.oco_resumo,
                    ocorrencia_data: ocorrencia.oco_data,
                    ocorrencia_ativo: ocorrencia.oco_ativa
                }
            })
        }
        return res.status(200).send({ response });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}