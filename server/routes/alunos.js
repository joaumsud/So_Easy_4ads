const express = require("express");
const router = express.Router();
const login = require('../middleware/Login')
const AlunoController = require('../controllers/alunos-controller')

router.get('/',AlunoController.getAlunos)

module.exports = router