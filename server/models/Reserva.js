const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cedulaPasaporte: { type: String, required: true }, // Usuario que hace la reserva
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', default: null }, // Hotel reservado
  actividad: { type: mongoose.Schema.Types.ObjectId, ref: 'Actividad', default: null }, // Actividad reservada
  costo: { type: Number, required: true },
  fechaReserva: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reserva', reservaSchema);
