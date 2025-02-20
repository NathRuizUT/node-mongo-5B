const Persona = require('../models/persona.model');

class PersonaRepository {
    //Buscar todas las personas
    async getAllPersonas() {
        return await Persona.find();
    }

    //Buscar una persona por id
    async getPersonaById(id){
        return await Persona.findById(id);
    }

    //Buscar una persona por RFC
    async getPersonaByRFC(rfc){
        return await Persona.findOne({rfc: rfc});
    }

    //Buscar una persona por correo
    async getPersonaByCorreo(correo){
        return await Persona.findOne({correo: correo});
    }

    //Crear una persona
    async createPersona(persona){
        return await Persona.create(persona);
    }

    //Actualizar una persona
    async updatePersona(id, persona){
        return await Persona.findByIdAndUpdate(id, persona, {new: true});
    }

    //Eliminar una persona
    async deletePersona(id){
        return await Persona.findByIdAndDelete(id);
    }

    //Buscar si hay otro rfc igual de la persona que le estoy mandando(id)
    //el rfc sea igual al rfc que le estoy mandando
    //y el id sea diferente al id que le estoy mandando $ne
    async getPersonaByRFCAndNotId(id, rfc){
        //return await Persona.findOne({_id: {$ne:id, rfc: rfc}})  --código con error
        
        //código correcto
        return await Persona.findOne({_id: {$ne:id}, rfc: rfc})
    }


    //Buscar si hay otro rfc igual de la persona que le estoy mandando(id)
    //el correo sea igual al correo que le estoy mandando
    //y el id sea diferente al id que le estoy mandando $ne
    async getPersonaByCorreoAndNotId(id, correo){
        //return await Persona.findOne({_id: {$ne:id, correo: correo}}) --código con error

        //código correcto
        return await Persona.findOne({_id: {$ne:id}, correo: correo})
    }

}

module.exports = new PersonaRepository();