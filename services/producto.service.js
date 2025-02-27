const ProductoRepository = require('../repositories/producto.repository');
const Validaciones = require('../utils/validation');

class ProductoService{
    async getAllProductos(){
        return await ProductoRepository.getAllProductos();
    }

    async getProductoById(id){
        const producto = await ProductoRepository.getProductoById(id);
        if(!producto){
            throw new Error('Producto no encontrado');
        }
        return producto;
    }

    async getProductoByNumSerie(numSerie){
        const producto = await ProductoRepository.getProductoByNumSerie(numSerie);
        if(!producto){
            throw new Error('No existe un producto con ese número de serie');
        }
        return producto;
    }

    async createProducto(producto){
        //Validar que todos los campos obligatorios vengan
        if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie) {
            throw new Error('Todos los campos son requeridos');
        }

        //Validar que el numero de serie no exista
        const productoByNumSerie = await ProductoRepository.getProductoByNumSerie(producto.numSerie);
        if (productoByNumSerie) {
            throw new Error('El número de serie ya existe');
        }

        //Validar que el precio no sea negativo
        if (producto.precio < 1) {
            throw new Error('El precio debe ser mayor a 0');
        }

        //Validar que la fecha de adquisicion tenga formato valido
        if(!Validaciones.esFechaValida(producto.fechaAdquisicion)){
            throw new Error('La fecha de adquisición no tiene el formato correcto');
        }
        //Generar número de inventario
        //año-consecutivo 20225-001
        //Obtener el año de adquisicion
        //2025-02-24
        const yearAdquisicion = producto.fechaAdquisicion.split('-')[0];
        //2025 [0]
        //02 [1]
        //24[2]

        let countYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);

        //Incremetar en 1 el contador
        countYear++;

        //padStart funciona para agregar ceros a la izquierda si el número no tiene dígitos
        producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, '0')}`;

        return await ProductoRepository.createProducto(producto);
    }

    async updateProducto(id, producto){
        //Validar que el producto exista
        const productoById = await ProductoRepository.getProductoById(id);
        if (!productoById) {
            throw new Error('Producto no encontrado');
        }
        //Validar que todos los campos obligatorios vengan
        if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie) {
            throw new Error('Todos los campos son requeridos');
        }

        //Validar que el precio no sea negativo
        if (producto.precio < 1) {
            throw new Error('El precio debe ser mayor a 0');
        }

        //Validar que la fecha de adquisicion tenga formato valido
        if(!Validaciones.esFechaValida(producto.fechaAdquisicion)){
            throw new Error('La fecha de adquisición no tiene el formato correcto');
        }

        //Validar que el numSerie no exista en otro producto
        //Que no lo tengan otro producto, que no sea el mismo producto 
        const productoByNumSerieAndNotId = await ProductoRepository.getProductoByNumSerieAndNotId(id, producto.numSerie);
        if (productoByNumSerieAndNotId) {
            throw new Error('El número de serie ya existe');
        }

        //No se edita el numInventario

        return await ProductoRepository.updateProducto(id, producto);
    }

    async deleteProducto(id){
        //Validar si el producto existe
        const producto = await ProductoRepository.getProductoById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        return await ProductoRepository.deleteProducto(id);
    }

}

module.exports = new ProductoService();