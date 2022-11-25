const express = require("express");
const router = express.Router();
const multer = require("multer");

const login = require('../middleware/Login')
const OcorrenciasController = require('../controllers/ocorrencias-controller')

router.get('/',login.obrigatorio,OcorrenciasController.getOcorrencias)

module.exports = router