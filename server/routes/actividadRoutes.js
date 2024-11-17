const express = require('express');
const { crearActividad, obtenerActividades, actualizarActividad, eliminarActividad } = require('../controllers/actividadController');
const { validarAdministrador } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas
router.post('/crear', validarAdministrador, crearActividad); // Crear actividad (solo administradores)
router.get('/', obtenerActividades); // Obtener todas las actividades (público)
router.put('/:id', validarAdministrador, actualizarActividad); // Actualizar actividad (solo administradores)
router.delete('/:id', validarAdministrador, eliminarActividad); // Eliminar actividad (solo administradores)

module.exports = router;
