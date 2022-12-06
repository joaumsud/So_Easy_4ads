const express = require("express");
const router = express.Router();
const multer = require("multer");

const login = require('../middleware/Login')
const OcorrenciasController = require('../controllers/ocorrencias-controller')

router.get('/',login.obrigatorio,OcorrenciasController.getOcorrencias)
router.get('/:id',login.obrigatorio,OcorrenciasController.getOcorrenciasPorIdAluno)
router.patch('/:ocoId',login.obrigatorio,OcorrenciasController.updateOcorrencia)
router.delete('/:ocorrenciaId',login.obrigatorio,OcorrenciasController.deleteOcorrencia)

module.exports = router