const Administrador = require('../models/Administrador');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generar Token
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Crear Administrador
const crearAdministrador = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    // Verificar si el administrador ya existe
    const adminExistente = await Administrador.findOne({ correo });
    if (adminExistente) {
      return res.status(400).json({ message: 'El administrador ya existe' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    // Crear nuevo administrador
    const nuevoAdmin = new Administrador({ 
      nombre, 
      correo, 
      contraseña: contraseñaHash 
    });
    await nuevoAdmin.save();

    // Generar token
    const token = generarToken(nuevoAdmin._id);

    res.status(201).json({
      message: 'Administrador creado correctamente',
      token,
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear administrador', 
      error: error.message 
    });
  }
};

// Obtener Administradores
const obtenerAdministradores = async (req, res) => {
  try {
    const administradores = await Administrador.find().select('-contraseña'); // Excluir contraseñas
    res.status(200).json(administradores);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener administradores', 
      error: error.message 
    });
  }
};

// Eliminar Administrador
const eliminarAdministrador = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Administrador.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    await Administrador.findByIdAndDelete(id);
    res.status(200).json({ message: 'Administrador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar administrador', 
      error: error.message 
    });
  }
};

// Iniciar Sesión como Administrador
const loginAdministrador = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Verificar si el administrador existe
    const admin = await Administrador.findOne({ correo });
    if (!admin) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(contraseña, admin.contraseña);
    if (!esValido) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generarToken(admin._id);

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al iniciar sesión', 
      error: error.message 
    });
  }
};

module.exports = { 
  crearAdministrador, 
  obtenerAdministradores, 
  eliminarAdministrador, 
  loginAdministrador 
};