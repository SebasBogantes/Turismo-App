const Usuario = require('../models/Usuario');
const Administrador = require('../models/Administrador'); // Importar modelo de Administrador

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Registrar Usuario
const registerUsuario = async (req, res) => {
  const { cedulaPasaporte, nombre, correo, contraseña } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const contraseñaHash = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      cedulaPasaporte,
      nombre,
      correo,
      contraseña: contraseñaHash,
    });

    await nuevoUsuario.save();
    const token = generarToken(nuevoUsuario._id);

    res.status(201).json({ message: 'Usuario registrado', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

// Login de Usuario
const loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Buscar primero en usuarios
    let usuario = await Usuario.findOne({ correo });
    let role = 'usuario'; // Asume inicialmente que es un usuario normal

    // Si no se encuentra en usuarios, buscar en administradores
    if (!usuario) {
      usuario = await Administrador.findOne({ correo });
      role = 'admin'; // Cambiar el rol si es un administrador
    }

    // Si no se encuentra en ninguna de las dos colecciones, devolver error
    if (!usuario) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar token JWT con el rol incluido
    const token = jwt.sign(
      { id: usuario._id, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      role, // Enviar el rol como parte de la respuesta
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Obtener Usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-contraseña');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

module.exports = { registerUsuario, loginUsuario, obtenerUsuarios };
