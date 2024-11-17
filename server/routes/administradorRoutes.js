const express = require('express');

const {
  crearAdministrador,
  obtenerAdministradores,
  eliminarAdministrador,
  loginAdministrador,
} = require('../controllers/administradorController');

const router = express.Router();

// Rutas de administrador
router.post('/register', crearAdministrador); // Crear administrador
router.get('/', obtenerAdministradores); // Obtener todos los administradores
router.post('/login', loginAdministrador); // Iniciar sesión como administrador
router.delete('/:id', eliminarAdministrador); // Eliminar administrador

module.exports = router;