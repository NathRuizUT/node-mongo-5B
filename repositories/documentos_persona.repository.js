const DocumentosPersona = require('../models/documentos_persona.model');

class DocumentosPersonaRepository{
    async createDocumentosPersona(documentosPersona){
        return await DocumentosPersona.create(documentosPersona);
    }

    async getDocumentosPersonaByIdDocumento(id){
        return await DocumentosPersona.findOne({documentoId: id});
    }

    async updateStatusDocumentosPersona(documentoId) {
        const result = await DocumentosPersona.updateOne(
            { documentoId: documentoId }, // Filtro: buscar por el campo documentoId
            { $set: { estado: 'Inactivo' } } // Actualización: cambiar estado a 'Inactivo'
        );
        return result;

    }

    async getDocumentosPersonaByIdPersona(personaId){
        return await DocumentosPersona.find({personaId: personaId});
    }
}
module.exports = new DocumentosPersonaRepository();