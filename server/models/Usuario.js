const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  cedulaPasaporte: { type: String, required: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
