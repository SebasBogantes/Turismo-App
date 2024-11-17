const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Usuario que hizo la reseña
  destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Destino', required: true }, // Destino reseñado
  calificacion: { type: Number, min: 1, max: 5, required: true }, // Escala de 1 a 5
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', reseñaSchema);
