const AsignacionProductoService = require('../services/asignacionProducto.service');

class AsignacionProductoController {
    async getAllAsignacionesActivas(req, res) {
        try {
            const asignacionesActivas = await AsignacionProductoService.getAllAsignacionesActivas();
            res.json(asignacionesActivas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllAsignacionesProductosByPersona(req, res) {
        try{
            const personaId = req.params.id;
            //Validar que el id de la persona venga en la petición
            if (!personaId || personaId == '' || personaId == null || personaId == undefined){
                throw new Error('El id de la persona es requerido');
            }
            const asignacionesPersona = await AsignacionProductoService.getAllAsignacionesProductosByPersona(req.params.id);
            res.json(asignacionesPersona);
        }catch(error){
            res.status(400).json({message : error.message})
        }
    }

    async createAsignacionProducto(req, res) {
        try {
            //Validar que el id de la persona y el id del producto vengan en el body 
            const personaId = req.body.persona;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id de la persona es requerido');
            }

            const productoId = req.body.producto;
            if (!productoId || productoId == '' || productoId == null || productoId == undefined) {
                throw new Error('El id del producto es requerido');
            }

            const asignacionCreada = await AsignacionProductoService.createAsignacionProducto(personaId, productoId);
            res.json(asignacionCreada);

        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }

    async createAsignacionProductos(req, res) {
        try {
            //Validar que el id de la persona y el id del producto vengan en el body 
            const personaId = req.body.persona;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined) {
                throw new Error('El id de la persona es requerido');
            }

            const productos = req.body.producto;
            if (!productos || productos.length == 0 || productos == null || productos == undefined) {
                throw new Error('Los productos son requeridos');
            }

            const asignacionesCreadas = await AsignacionProductoService.createAsignacionProductos(personaId, productos);
            res.json(asignacionesCreadas);

        } catch (error) {
            res.status(400).json({ message: error.message });

        }
    }

    async inactiveStatusAsignacionProducto(req, res){
        try{

            //Validar que el id de la asignación venga en la petición
            const asignacionId = req.params.id;
            if (!asignacionId || asignacionId == '' || asignacionId == null || asignacionId == undefined){
                throw new Error('El id de la asignación es requerido');
            }

            const asignacionEstadoCambiado = await AsignacionProductoService.inactiveStatusAsignacionProducto(asignacionId);
            res.json(asignacionEstadoCambiado);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }


};

module.exports = new AsignacionProductoController();