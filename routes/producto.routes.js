const express = require('express');
const ProductoController =  require('../controllers/producto.controller');
const router = express.Router();

//Obtener todos los productos
router.get('/', ProductoController.getAllProductos);

//Crear productos
router.post('/', ProductoController.createProducto);

module.exports = router;
