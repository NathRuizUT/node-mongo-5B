const mongoose = require('mongoose');

const documentosPersona = new mongoose.Schema({
    personaId: {type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true},
    documentoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Documento', required: true},
    estado: {type: String, required: true, default: 'Activo'}
})

module.exports = mongoose.model('DocumentosPersona', documentosPersona);    