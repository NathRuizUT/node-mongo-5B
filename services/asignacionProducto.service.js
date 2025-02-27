const AsignacionProductoRepository = require('../repositories/asignacionProducto.repository');
const PersonaRepository = require('../repositories/persona.repository');
const ProductoRepository = require('../repositories/producto.repository');
class AsignacionProductoService {
    async getAllAsignacionesActivas() {
        return await AsignacionProductoRepository.getAllAsignacionesActivas();
    }

    async createAsignacionProducto(personaId, productoId) {
        //Validar que la persona exista al igual que el producto
        const persona = await PersonaRepository.getPersonaById(personaId);
        if (!persona) {
            throw new Error('La persona no existe');
        }

        const producto = await ProductoRepository.getProductoById(productoId);
        if (!producto) {
            throw new Error('El producto no existe');
        }

        const asignacionCreada = await AsignacionProductoRepository.createAsignacionProducto(personaId, productoId);
        return asignacionCreada;
    }

    async createAsignacionProductos(personaId, productosId) {
        //Validar que la persona exista al igual que el producto
        const persona = await PersonaRepository.getPersonaById(personaId);
        if (!persona) {
            throw new Error('La persona no existe');
        }

        //Declaramos un arreglo para guardar las asignaciones creadas
        let asignaciones = [];

        //Recorrer el arreglo de productosId, nos mandará un arreglo de los ids de los productos
        for (let index = 0; index < productosId.length; index++) {
            //En productoId se guarda el Id del producto que se encuentra en la posición index del arreglo productosId
            const productoId = productosId[index];

            try {
                const asignacionCreada = await AsignacionProductoRepository.createAsignacionProducto(personaId, productoId);
                asignaciones.push(asignacionCreada);
            } catch (error) {
                const asignacionError = {producto: productoId, error: error.message};
                /*[{
                    producto: '1234567890',
                    error: 'El producto no existe'
                },
                {
                    producto: '1234567890',
                    error: 'El producto no existe'
                }
            ]*/
                asignaciones.push(asignacionError);
            }

        }
        return asignaciones;
    }
};

module.exports = new AsignacionProductoService();