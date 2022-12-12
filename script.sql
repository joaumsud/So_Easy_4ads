-- MySQL Script generated by MySQL Workbench
-- seg 12 dez 2022 11:14:27 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema soeasy
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `soeasy` ;

-- -----------------------------------------------------
-- Schema soeasy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `soeasy` DEFAULT CHARACTER SET utf8 ;
USE `soeasy` ;

-- -----------------------------------------------------
-- Table `soeasy`.`pes_pessoa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soeasy`.`pes_pessoa` ;

CREATE TABLE IF NOT EXISTS `soeasy`.`pes_pessoa` (
  `pes_id` INT NOT NULL AUTO_INCREMENT,
  `pes_nome` VARCHAR(100) NOT NULL,
  `pes_cpf` CHAR(11) NOT NULL,
  PRIMARY KEY (`pes_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`TUR_TURMA`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soeasy`.`tur_turma` ;

CREATE TABLE IF NOT EXISTS `soeasy`.`tur_turma` (
  `tur_id` INT NOT NULL AUTO_INCREMENT,
  `tur_ano` INT NOT NULL,
  `tur_grupo` CHAR(1) NOT NULL,
  PRIMARY KEY (`tur_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`ALU_ALUNO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soeasy`.`alu_aluno` ;

CREATE TABLE IF NOT EXISTS `soeasy`.`alu_aluno` (
  `alu_id` INT NOT NULL AUTO_INCREMENT,
  `alu_ra` VARCHAR(20) NOT NULL,
  `alu_ativo` TINYINT(1) NOT NULL DEFAULT 1,
  `pes_id` INT NOT NULL,
  `tur_id` INT NOT NULL,
  PRIMARY KEY (`alu_id`),
  INDEX `fk_Aluno_Pessoa_idx` (`pes_id` ASC),
  INDEX `fk_Aluno_Turma1_idx` (`tur_id` ASC),
  CONSTRAINT `fk_Aluno_Pessoa`
    FOREIGN KEY (`pes_id`)
    REFERENCES `soeasy`.`pes_pessoa` (`pes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aluno_Turma1`
    FOREIGN KEY (`tur_id`)
    REFERENCES `soeasy`.`tur_turma` (`tur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -- -----------------------------------------------------
-- -- Table `soeasy`.`RES_RESPONSAVEL`
-- -- -----------------------------------------------------
-- DROP TABLE IF EXISTS `soeasy`.`RES_RESPONSAVEL` ;

-- CREATE TABLE IF NOT EXISTS `soeasy`.`RES_RESPONSAVEL` (
--   `res_id` INT NOT NULL AUTO_INCREMENT,
--   `res_telefone` VARCHAR(11) NOT NULL,
--   `pes_id` INT NOT NULL,
--   PRIMARY KEY (`res_id`),
--   INDEX `fk_Responsável_Pessoa1_idx` (`pes_id` ASC),
--   CONSTRAINT `fk_Responsável_Pessoa1`
--     FOREIGN KEY (`pes_id`)
--     REFERENCES `soeasy`.`pes_pessoa` (`pes_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`ALU_RESPONSAVEL`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `soeasy`.`ALU_RESPONSAVEL` ;

-- CREATE TABLE IF NOT EXISTS `soeasy`.`ALU_RESPONSAVEL` (
--   `alu_id` INT NOT NULL,
--   `res_id` INT NOT NULL,
--   PRIMARY KEY (`alu_id`, `res_id`),
--   INDEX `fk_Aluno_has_Responsável_Responsável1_idx` (`res_id` ASC),
--   INDEX `fk_Aluno_has_Responsável_Aluno1_idx` (`alu_id` ASC),
--   CONSTRAINT `fk_Aluno_has_Responsável_Aluno1`
--     FOREIGN KEY (`alu_id`)
--     REFERENCES `soeasy`.`alu_aluno` (`alu_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION,
--   CONSTRAINT `fk_Aluno_has_Responsável_Responsável1`
--     FOREIGN KEY (`res_id`)
--     REFERENCES `soeasy`.`RES_RESPONSAVEL` (`res_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`END_ENDERECO`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `soeasy`.`END_ENDERECO` ;

-- CREATE TABLE IF NOT EXISTS `soeasy`.`END_ENDERECO` (
--   `end_id` INT NOT NULL AUTO_INCREMENT,
--   `end_estado` VARCHAR(45) NOT NULL,
--   `end_cidade` VARCHAR(45) NOT NULL,
--   `end_bairro` VARCHAR(45) NOT NULL,
--   `end_rua` VARCHAR(45) NOT NULL,
--   `end_numero` INT NOT NULL,
--   `end_cep` VARCHAR(20) NOT NULL,
--   `end_comprovante_path` VARCHAR(100) NULL,
--   `alu_id` INT NOT NULL,
--   PRIMARY KEY (`end_id`),
--   INDEX `fk_Endereço_Aluno1_idx` (`alu_id` ASC),
--   CONSTRAINT `fk_Endereço_Aluno1`
--     FOREIGN KEY (`alu_id`)
--     REFERENCES `soeasy`.`alu_aluno` (`alu_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`oco_ocorrencia`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soeasy`.`oco_ocorrencia` ;

CREATE TABLE IF NOT EXISTS `soeasy`.`oco_ocorrencia` (
  `oco_id` INT NOT NULL AUTO_INCREMENT,
  `oco_resumo` VARCHAR(250) NOT NULL,
  `oco_doc_path` VARCHAR(100) NULL,
  `oco_data` DATE NOT NULL,
  `oco_ativa` TINYINT(1) NOT NULL,
  `alu_id` INT NOT NULL,
  PRIMARY KEY (`oco_id`),
  INDEX `fk_Ocorrência_Aluno1_idx` (`alu_id` ASC),
  CONSTRAINT `fk_Ocorrência_Aluno1`
    FOREIGN KEY (`alu_id`)
    REFERENCES `soeasy`.`alu_aluno` (`alu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`DEC_DECLARACAO`
-- -----------------------------------------------------
-- DROP TABLE IF EXISTS `soeasy`.`DEC_DECLARACAO` ;

-- CREATE TABLE IF NOT EXISTS `soeasy`.`DEC_DECLARACAO` (
--   `dec_id` INT NOT NULL AUTO_INCREMENT,
--   `dec_resumo` VARCHAR(250) NULL,
--   `dec_doc_path` VARCHAR(100) NOT NULL,
--   `dec_data` DATE NOT NULL,
--   `dec_ativa` TINYINT(1) NOT NULL,
--   `alu_id` INT NOT NULL,
--   PRIMARY KEY (`dec_id`),
--   INDEX `fk_Condição médica_Aluno1_idx` (`alu_id` ASC),
--   CONSTRAINT `fk_Condição médica_Aluno1`
--     FOREIGN KEY (`alu_id`)
--     REFERENCES `soeasy`.`alu_aluno` (`alu_id`)
--     ON DELETE NO ACTION
--     ON UPDATE NO ACTION)
-- ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `soeasy`.`usu_usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `soeasy`.`usu_usuario` ;

CREATE TABLE IF NOT EXISTS `soeasy`.`usu_usuario` (
  `usu_id` INT NOT NULL AUTO_INCREMENT,
  `usu_nome` VARCHAR(100) NOT NULL,
  `usu_email` VARCHAR(50) NOT NULL,
  `usu_senha` VARCHAR(250) NOT NULL,
  `usu_nivel_acesso` ENUM('1', '2', '3') NOT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE INDEX `usu_email_UNIQUE` (`usu_email` ASC))
ENGINE = InnoDB;

INSERT INTO usu_usuario(usu_nome, usu_email, usu_senha, usu_nivel_acesso) VALUES('Admin', 'admin@email.com', '$2b$10$V9855wmz6whcrzUz/lKXYugBvpA48Vy0gfSNb3DBc86ZYkiE.z5uK', '3');

INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Maria da Silva', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Jóse da Silva', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Ana de Souza', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Felipe de Souza', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Jõao Santos', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('José Santos', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Matheus Oliveira', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Fernado Oliveira', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Bruno Fernandes', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Felipe Fernandes', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Maria Nascimento', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Fernando da Silva', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Marcos de Souza', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('João de Souza', '0');
INSERT INTO pes_pessoa(pes_nome, pes_cpf) VALUES('Rodrigo Santos', '0');

INSERT INTO tur_turma(tur_ano, tur_grupo) VALUES(1, 'A');
INSERT INTO tur_turma(tur_ano, tur_grupo) VALUES(2, 'A');
INSERT INTO tur_turma(tur_ano, tur_grupo) VALUES(3, 'A');
INSERT INTO tur_turma(tur_ano, tur_grupo) VALUES(4, 'A');
INSERT INTO tur_turma(tur_ano, tur_grupo) VALUES(5, 'A');

INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000001', 1, 1);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000002', 2, 1);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000003', 3, 1);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000004', 4, 2);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000005', 5, 2);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000006', 6, 2);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000007', 7, 3);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000008', 8, 3);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000009', 9, 3);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000010', 10, 4);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000011', 11, 4);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000012', 12, 4);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000013', 13, 5);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000014', 14, 5);
INSERT INTO alu_aluno(alu_ra, pes_id, tur_id) VALUES('00000015', 15, 5);

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
