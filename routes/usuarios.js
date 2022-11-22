const express = require("express")
const router = express.Router()
const UsuariosController = require('../controllers/usuarios-controller')
const login = require('../middleware/Login')

//router.post("/cadastro", UsuariosController.postCadastro)

router.post("/cadastro", login.obrigatorio,login.nivelAdm,UsuariosController.postCadastro)

router.post('/login', UsuariosController.postLogin)

module.exports = router