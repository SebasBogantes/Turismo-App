// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Administrador = require('../models/Administrador');
const Usuario = require('../models/Usuario');

// Middleware para validar cualquier usuario autenticado
const validarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Almacena la información del token decodificado en la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
  }
};

// Middleware para validar si el usuario es administrador
const validarAdministrador = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Administrador.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: 'No tienes permisos para esta acción' });
    }
    req.admin = admin; // Almacena la información del administrador en la solicitud
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
  }
};

module.exports = { validarToken, validarAdministrador };
