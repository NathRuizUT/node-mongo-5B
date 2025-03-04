const DocumentosPersonaRepository = require('../repositories/documentos_persona.repository');
const PersonaRepository = require('../repositories/persona.repository');

class DocumentosPersonaService{
    async createDocumentosPersona(idPersona, idDocumento, nombreDocumento){
        const documentoPersona = {
            personaId: idPersona,
            documentoId: idDocumento,
            nombreDocumento: nombreDocumento
        };

        return await DocumentosPersonaRepository.createDocumentosPersona(documentoPersona);
    }

    async updateStatusDocumentosPersona(documentoId){
        //validar que el documento exista
        const documento = await DocumentosPersonaRepository.getDocumentosPersonaByIdDocumento(documentoId);
        if(!documento){
            throw new Error('El documento no existe');
        }
        return await DocumentosPersonaRepository.updateStatusDocumentosPersona(documentoId);
    }

    async getDocumentosPersonaById(personaId){
        //validar que la persona exista
        const persona = await PersonaRepository.getPersonaById(personaId);
        if(!persona){
            throw new Error('La persona no existe');
        }

        return await DocumentosPersonaRepository.getDocumentosPersonaByIdPersona(personaId);
    }

    
}

module.exports = new DocumentosPersonaService();