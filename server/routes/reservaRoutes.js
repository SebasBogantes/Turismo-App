const express = require('express');
const { crearReserva, obtenerReservasUsuario, eliminarReserva } = require('../controllers/reservaController');
const { validarToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas protegidas por autenticación
router.post('/', validarToken, crearReserva); // Crear reserva (requiere autenticación)
router.get('/', validarToken, obtenerReservasUsuario); // Obtener reservas de usuario autenticado
router.delete('/:id', validarToken, eliminarReserva); // Eliminar reserva (requiere autenticación)

module.exports = router;
