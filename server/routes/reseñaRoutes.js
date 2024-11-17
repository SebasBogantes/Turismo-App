const express = require('express');
const { crearReseña, obtenerReseñasDestino, eliminarReseña } = require('../controllers/reseñaController');
const { validarToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas
router.post('/', validarToken, crearReseña); // Crear reseña (requiere autenticación)
router.get('/:destinoId', obtenerReseñasDestino); // Obtener reseñas por destino (público)
router.delete('/:id', validarToken, eliminarReseña); // Eliminar reseña (requiere autenticación)

module.exports = router;
