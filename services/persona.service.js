const PersonaRepository = require('../repositories/persona.repository');
const Validaciones = require('../utils/validation');
const Utils = require('../utils/utils');
class PersonaService{
    async getAllPersonas(){
        return await PersonaRepository.getAllPersonas();
    }

    async getPersonaById(id){
        const persona = await PersonaRepository.getPersonaById(id);
        if(!persona){
            throw new Error('Persona no encontrada');
        }

        return persona;
    }

    async createPersona(persona){
        //Validar que todos los campos obligatorios vengan
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error('Todos los campos son requeridos');
        }

        //Validar que el formato del RFC y del correo sea válido
        Validaciones.validarRFC(persona.rfc);

        Validaciones.validarCorreo(persona.correo);

        //Validar que el RFC no exista en la base de datos
        const personaByRFC = await PersonaRepository.getPersonaByRFC(persona.rfc);

        //Validar que el correo no exista en la base de datos
        const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo);

        if (personaByRFC) {
            throw new Error('El RFC ya existe');
        }

        if (personaByCorreo) {
            throw new Error('El correo ya existe');
        }

        //Validar que la fecha de nacimiento sea válida
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }

        return await PersonaRepository.createPersona(persona);
    }

    async updatePersona(id, persona){

        //Validar que la persona exista
        const personaById = await PersonaRepository.getPersonaById(id);
        if (!personaById) {
            throw new Error('Persona no encontrada');
        }

        //Todos los campos requeridos vengan en el body
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error('Todos los campos son requeridos');
        }

        //Validar que el formato del RFC y del correo sea válido
        Validaciones.validarRFC(persona.rfc);

        Validaciones.validarCorreo(persona.correo);

        //Validar que el correo no exista en la base de datos
        const personaByCorreoAndNotId = await PersonaRepository.getPersonaByCorreoAndNotId(id, persona.correo);
        if (personaByCorreoAndNotId) {
            throw new Error('El correo ya existe');
        }

        //Validar que el RFC no exista en la base de datos
        //Que no lo tengan otras personas, que no sea la misma persona
        const personaByRFCAndNotId = await PersonaRepository.getPersonaByRFCAndNotId(id, persona.rfc);
        if (personaByRFCAndNotId) {
            throw new Error('El RFC ya existe');
        }

        //Validar que la persona sea mayor de edad
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error('La persona debe ser mayor de edad');
        }

        return await PersonaRepository.updatePersona(id, persona);
    }

    async deletePersona(id) {
        const persona = await PersonaRepository.getPersonaById(id);
        if (!persona) {
            throw new Error('Persona no encontrada.');
        }
        return await PersonaRepository.deletePersona(id);
    }
}

module.exports = new PersonaService();