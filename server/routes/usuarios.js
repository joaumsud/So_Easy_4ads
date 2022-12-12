const express = require("express")
const router = express.Router()
const UsuariosController = require('../controllers/usuarios-controller')
const login = require('../middleware/Login')

router.post("/cadastro", login.obrigatorio, UsuariosController.postCadastro)

router.post('/login', UsuariosController.postLogin)

module.exports = router