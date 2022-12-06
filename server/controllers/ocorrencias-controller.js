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

exports.getOcorrenciasPorIdAluno = async (req, res, next) => {
  try {
    const query = `SELECT OCO_OCORRENCIA.oco_id,
        ALU_ALUNO.alu_id,
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
        ON ALU_ALUNO.alu_id = PES_PESSOA.pes_id
        WHERE ALUN_ALUNO.alu_id = ?;`;
    const result = await mysql.execute(query, [req.params.alu_id])
    if (result.length === 0) { return res.status(500).send({ error: `Ocorrências não encontradas!` }) }
    const response = {
      quantidade_ocorrencias: result.length,
      ocorrencias: result.map((ocorrencia) => {
        return {
          id_ocorrencia: ocorrencia.oco_id,
          alu_id: ocorrencia.alu_id,
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

exports.postOcorrencia = async (req, res, next) => {
  try {
    const query =
      `INSERT INTO 
       oco_ocorrencia 
       VALUES(?,
              ?,
              ?,
              ?,
              ?);`;
    const result = await mysql.execute(query, [
      req.body.resumo,
      req.file.path,
      req.body.data,
      req.body.ativa,
      req.body.aluno_id
    ]);
    const response = {
      mensagem: "Ocorrência inserida com sucesso",
      ocorrenciaCriada: {
        id_ocorrencia: result.oco_id,
        resumo: req.body.resumo,
        path: req.file.path,
        data: req.body.data,
        ativa: req.body.ativa,
        alunoId: req.body.aluno_id
      },
    };
    return res.status(201).send({ response });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

exports.updateOcorrencia = async (req, res, next) => {
  try {
    const query = `UPDATE oco_ocorrencia
                        SET oco_resumo = ?,
                            oco_doc_path = ?,
                            oco_data = ?,
                            oco_ativa = ?
                      WHERE oco_id = ?;`
    await mysql.execute(query, [
      req.body.oco_resumo,
      req.body.oco_path,
      req.body.data,
      req.body.ativa,
      req.params.ocoId
    ])
    const response = {
      message: `Produto atualizado com sucesso`,
      updateOcorrencia: {
        ocorrenciaId: req.params.ocoId,
        resumo: req.body.oco_resumo,
        imagem: req.body.oco_path,
        data: req.body.data,
        ativo: req.body.data,
        request: {
          type: 'GET',
          description: `Retorna os detalhes de uma ocorrência.`,
          url: process.env.URL_API + 'ocrencias/' + req.params.ocoId
        }
      }
    }
    return res.status(202).send(response)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

exports.deleteOcorrencia = async(req,res,next) =>{
  try {
    const query = `DELETE FROM oco_ocorrencia WHERE oco_id = ?`;
    await mysql.execute(query,[req.params.ocorrenciaId]);
    const response = {
      message: `Ocorrência excluida com sucesso`
    }
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error:error })
  }
}