const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoutes = require('./routes/persona.routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/personas', personasRoutes);

//conexión a la base de datos

mongoose.connect('mongodb+srv://nathalyescalona:ASWEEDA9081@asd.g5kr7.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=asd',{ useNewUrlParser: true, useUnifiedTopology: true })
//Recuerden que para conectarse es desde su MongoDB Atlas, en la sección de Clusters, en la parte de Connect, seleccionar Driver Node.js y copiar la cadena de conexión
//la cadena será algo así: mongodb+srv://nathalyescalona:<db_password>@asd.g5kr7.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=asd
//ustedes deberán cambiarlo a qué se forme así: 
//mongodb+srv://nathalyescalona:CONTRASEÑACLUSTER@asd.g5kr7.mongodb.net/NOMBREBASEDEDATOS?retryWrites=true&w=majority&appName=asd
//eso es lo que va en comillas en el método connect, y depués se agrega lo de las llaves, ejemplo completo:
//mongoose.connect('mongodb+srv://nathalyescalona:ASWEEDA9081@asd.g5kr7.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=asd',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() =>{
    console.log('Conexión exitosa a la base de datos a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
})
.catch((err) => console.log('Error al conectar en MongoDB', err));
