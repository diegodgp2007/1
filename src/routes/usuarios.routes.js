const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Rutas para usuarios
router.get('/', usuariosController.obtenerTodos);
router.get('/:id', usuariosController.obtenerPorId);

module.exports = router;