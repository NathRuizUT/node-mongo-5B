const Producto = require('../models/producto.model');

class ProductoRepository {
    async getAllProductos(){
        return await Producto.find();
    }

    async getProductoById(id){
        return await Producto.findById(id);
    }

    async getProductoByNumSerie(numSerie){
        return await Producto.findOne({numSerie: numSerie});
    }

    async createProducto(producto){
        return await Producto.create(producto);
    }

    async updateProducto(id, producto){
                                            //new: true -> devuelve el producto actualizado
        return await Producto.findByIdAndUpdate(id, producto, {new: true});
    }

    async deleteProducto(id){
        return await Producto.findByIdAndDelete(id);
    }

    async contarProductosByYear(year){
        const fechaInicio = new Date(`${year}-01-01T00:00:00.000Z`);
        const fechaFin = new Date(`${year}-12-31T23:59:59.999Z`);

        return await Producto.countDocuments({
            fechaAdquisicion:{
                $gte: fechaInicio,
                $lte:fechaFin
            }
        });
    }
}

module.exports = new ProductoRepository();