const express = require("express");
const router = express.Router();
const login = require('../middleware/Login')
const AlunoController = require('../controllers/alunos-controller')

router.post('/',AlunoController.getAlunos)

module.exports = router