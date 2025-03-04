const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

const mongoURI = 'mongodb+srv://nathalyescalona:ASWEEDA9081@asd.g5kr7.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=asd';

// Crear conexión manual a MongoDB
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Variable para GridFSBucket
let gfs;

// Esperamos a que la conexión esté lista
conn.once('open', () => {
  console.log('✅ Conexión a MongoDB abierta en GridFS');
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Configurar el almacenamiento en GridFS con Multer
// const storage = new GridFsStorage({
//   url: mongoURI, // Pasamos directamente la base de datos de la conexión
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       if (!file) {
//         return reject(new Error('No se recibió ningún archivo'));
//       }
//       resolve({
//         filename: `${Date.now()}-${file.originalname}`,
//         bucketName: 'uploads', // Bucket donde se guardan los archivos
//         metadata: { persona: req.body.personaId } 
//       });
//     });
//   }
// });

// Configurar Multer con el almacenamiento GridFS
//const upload = multer({ storage });

// Exportamos `upload` y una función para obtener `gfs` cuando esté listo
module.exports = {
  //upload,
  getGFS: () => {
    if (!gfs) {
      throw new Error('GridFS aún no está inicializado');
    }
    return gfs;
  }
};
