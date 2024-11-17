const express = require('express');
const { crearDestino, obtenerDestinos, actualizarDestino, eliminarDestino } = require('../controllers/destinoController');
const { validarAdministrador } = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

// Ruta para crear destino con validaciones y depuración
router.post(
  '/crear',
  validarAdministrador, // Validar si el usuario es administrador
  uploadMiddleware.array('imagenes', 10), // Middleware para manejar imágenes
  (req, res, next) => {
    console.log('Headers de la solicitud:', req.headers); // Verificar encabezados
    console.log('Body de la solicitud:', req.body); // Verificar datos del formulario
    console.log('Archivos de la solicitud:', req.files); // Verificar imágenes recibidas
    next();
  },
  crearDestino // Controlador final para procesar la solicitud
);

// Otras rutas
router.get('/', obtenerDestinos); // Obtener todos los destinos (público)
router.put('/:id', validarAdministrador, uploadMiddleware.array('imagenes', 10), actualizarDestino); // Actualizar destino
router.delete('/:id', validarAdministrador, eliminarDestino); // Eliminar destino

module.exports = router;
