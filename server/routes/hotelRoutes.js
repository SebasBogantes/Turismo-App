const express = require('express');
const { crearHotel, obtenerHoteles, actualizarHotel, eliminarHotel } = require('../controllers/hotelController');
const { validarAdministrador } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas
router.post('/crear', validarAdministrador, crearHotel); // Crear hotel (solo administradores)
router.get('/', obtenerHoteles); // Obtener todos los hoteles (público)
router.put('/:id', validarAdministrador, actualizarHotel); // Actualizar hotel (solo administradores)
router.delete('/:id', validarAdministrador, eliminarHotel); // Eliminar hotel (solo administradores)

module.exports = router;
