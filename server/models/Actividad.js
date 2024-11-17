const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  horariosDisponibles: { type: [String], required: true }, // Ejemplo: ["10:00 AM", "2:00 PM"]
  destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Destino', required: true } // Relación con destino
});

module.exports = mongoose.model('Actividad', actividadSchema);
