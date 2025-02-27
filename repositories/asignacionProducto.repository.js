const AsignacionProducto = require('../models/asignacionProducto.model');

class AsignacionProductoRepository  {
    
    async getAllAsignacionesActivas(){
        //consultar las asignaciones de los productos con estado activo
        return await AsignacionProducto.find({estado: 'Activo'}).populate('persona').populate('producto');
    }

    async getAllAsignacionesProductosByPersona(personaId){
        //populate('producto') -> para que me traiga la informacion del producto        
        return await AsignacionProducto.find({persona: personaId}).populate('producto');
    }

    //crear asignación de producto a una persona, necesito el id de la persona y el id del producto
    async createAsignacionProducto(personaId, productoId){
        const fechaAsignacion = new Date();
        fechaAsignacion.setHours(0,0,0,0);
        return await AsignacionProducto.create({persona: personaId, producto: productoId, fechaAsignacion: fechaAsignacion, estado: 'Activo'});
    }

    //solo actualizar estado de la asignación
    async inactiveStatusAsignacionProducto(idAsignacion){
       

    }

    async getAsignacionProductoById(id){
    }
}

module.exports = new AsignacionProductoRepository();