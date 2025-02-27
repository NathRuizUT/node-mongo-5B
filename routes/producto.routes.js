const express = require('express');
const ProductoController =  require('../controllers/producto.controller');
const router = express.Router();

//Obtener todos los productos
router.get('/', ProductoController.getAllProductos);
router.get('/id/:id', ProductoController.getProductoById);
router.get('/numSerie/:numSerie', ProductoController.getProductoByNumSerie);
//Crear productos
router.post('/', ProductoController.createProducto);
//Actualizar productos
router.put('/:id', ProductoController.updateProducto);
//Eliminar productos
router.delete('/:id', ProductoController.deleteProducto);
module.exports = router;
