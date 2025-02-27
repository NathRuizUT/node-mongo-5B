const ProductoService = require('../services/producto.service');  

class ProductoController{

    async getAllProductos(req, res){
        try{
            const productos = await ProductoService.getAllProductos();
            res.json(productos);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async getProductoById(req, res){
        try{
            const producto =  await ProductoService.getProductoById(req.params.id);
            res.json(producto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async getProductoByNumSerie(req, res){
        try{
            const producto = await ProductoService.getProductoByNumSerie(req.params.numSerie);
            res.json(producto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async createProducto(req, res){
        try{
            const producto = await ProductoService.createProducto(req.body);
            res.json(producto); 
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async updateProducto(req, res){
        try{
            const producto = await ProductoService.updateProducto(req.params.id,req.body);
            res.json(producto); 
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

    async deleteProducto(req, res){
        try{
            const producto = await ProductoService.deleteProducto(req.params.id);
            res.json(producto);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }

}

module.exports = new ProductoController();