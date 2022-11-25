use soeasy;

select * from USU_USUARIO;
insert into USU_USUARIO values(0,"marquinho",'marco@gmail.com','123456','1');
insert into USU_USUARIO values(0,"geraldao",'geraldo@hotmail.com','123456','2');

select * from PES_PESSOA;
select * from RES_RESPONSAVEL;
select * from TUR_TURMA;
select * from ALU_ALUNO;
select * from ALU_RESPONSAVEL;
select * from OCO_OCORRENCIA;

SELECT OCO_OCORRENCIA.oco_id, ALU_ALUNO.alu_ra,
PES_PESSOA.pes_nome, OCO_OCORRENCIA.oco_resumo
FROM
OCO_OCORRENCIA
INNER JOIN
ALU_ALUNO
ON OCO_OCORRENCIA.alu_id = ALU_ALUNO.alu_id
INNER JOIN
PES_PESSOA
ON ALU_ALUNO.alu_id = PES_PESSOA.pes_id


