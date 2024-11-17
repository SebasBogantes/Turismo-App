const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  servicios: { type: [String], required: true }, // Array de servicios
  disponibilidad: { type: Boolean, default: true },
  destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Destino', required: true } // Relación con destino
});

module.exports = mongoose.model('Hotel', hotelSchema);
