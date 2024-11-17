const express = require('express');
const { registerUsuario, loginUsuario, obtenerUsuarios } = require('../controllers/usuarioController');
const { validarToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas
router.post('/register', registerUsuario); // Registro de usuarios (no requiere autenticación)
router.post('/login', loginUsuario); // Login de usuarios (no requiere autenticación)
router.get('/', validarToken, obtenerUsuarios); // Obtener usuarios (requiere autenticación)

module.exports = router;
