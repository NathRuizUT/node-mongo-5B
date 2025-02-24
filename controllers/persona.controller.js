const PersonaService = require('../services/persona.service');
class PersonaController {
    async getAllPersonas(req, res) {
        try {
            const personas = await PersonaService.getAllPersonas();
            //por defecto siempre retorna 200 sino se le especifica el status
            // 200 -> éxito | OK
            res.status(200).json(personas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPersonaById(req, res) {
        try {
            console.log(req.params);
            //Validar que el id venga en la petición
            const personaId = req.params.id;
            //QUITARLE LA NEGACIÓN de !personaId == '
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id de la persona es requerido');
            }
            const persona = await PersonaService.getPersonaById(personaId);
            res.json(persona);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createPersona(req, res){
        try{
            const persona = await PersonaService.createPersona(req.body);
            res.json(persona);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async updatePersona(req, res){
        try{
            //Validar que el id venga en la petición
            const personaId = req.params.id;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id de la persona es requerido');
            }

            const persona = await PersonaService.updatePersona(personaId, req.body);
            res.json(persona);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async deletePersona(req, res){
        try{
            const persona = await PersonaService.deletePersona(req.params.id);
            res.json(persona);
            console.log('Persona eliminada correctamente');
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }


    
}

module.exports = new PersonaController();