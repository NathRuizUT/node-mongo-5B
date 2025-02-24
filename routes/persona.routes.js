const express = require('express');
const PersonaController = require('../controllers/persona.controller');
const router = express.Router();

//Obtener todas las personas
router.get('/', PersonaController.getAllPersonas);
router.get('/id/:id', PersonaController.getPersonaById);
router.post('/', PersonaController.createPersona);
router.put('/:id', PersonaController.updatePersona);  
router.delete('/:id', PersonaController.deletePersona);

module.exports = router;
