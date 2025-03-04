const DocumentosPersonaService = require('../services/documentos_persona.service');
const { getGFS } = require('../config/gridfs');
const mongoose = require('mongoose');


class DocumentosPersonaController {

    async createDocumentosPersona(req, res) {
        console.log(req.body);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No se subieron archivos.');
        }



        /*
            archivo = {data bytes}
            archivo = [
                {data bytes},
                {data bytes},
                {data bytes}
            ]
        */
        const files = req.files.archivo;
        // Si es un solo archivo, lo convertimos en un array para manejarlo de la misma forma
        const filesArray = Array.isArray(files) ? files : [files];

        // Función que sube un archivo y devuelve su ID
        const uploadFile = (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = getGFS().openUploadStream(
                    file.name, {
                    chunkSizeBytes: 1048576,
                    //Para guardar el tipo de archivo
                    metadata: { contentType: file.mimetype }
                });

                const buffer = file.data;
                uploadStream.write(buffer);
                uploadStream.end();

                // Esperamos a que el archivo termine de subirse
                uploadStream.on('finish', () => {
                    resolve({
                        message: 'Archivo subido correctamente',
                        fileId: uploadStream.id,
                        fileName: uploadStream.filename
                    });
                });

                uploadStream.on('error', (err) => {
                    reject(err);
                });
            });
        };


        // Usamos `Promise.all()` para esperar la subida de todos los archivos
        const idFiles = await Promise.all(filesArray.map(file => uploadFile(file)));
        const resp = [];
        for (const fileX of idFiles) {
            const idDocumentoGuardado = fileX.fileId;
            const nombreDocumentoGuardado = fileX.fileName;

            const idPersona = req.body.personaId;
            if (!idPersona || idPersona == '' || idPersona == null || idPersona == undefined) {
                throw new Error('El id de la persona es requerido');
            }

            const documentoPersonaCreado = await DocumentosPersonaService.createDocumentosPersona(idPersona, idDocumentoGuardado, nombreDocumentoGuardado);
            resp.push(documentoPersonaCreado);

        }


        res.json(resp);
    }


    async downloadFile(req, res) {
        try {
            const gfs = getGFS(); // Obtener instancia de GridFS
            const fileId = new mongoose.Types.ObjectId(req.params.id);

            const file = await gfs.find({ _id: fileId }).toArray();
            if (!file || file.length === 0) {
                return res.status(404).json({ error: 'Archivo no encontrado' });
            }

            res.set('Content-Type', file[0].metadata.contentType);
            gfs.openDownloadStream(fileId).pipe(res);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStatusDocumentosPersona(req, res) {
        try {
            const documentoId = req.params.id;
            if (!documentoId || documentoId == '' || documentoId == null || documentoId == undefined) {
                throw new Error('El id del documento es requerido');
            }

            const documentoPersona = await DocumentosPersonaService.updateStatusDocumentosPersona(documentoId);

            res.json(documentoPersona);

        } catch (error) {
            res.status(400).json({ message: error.message });

        }

    }

    async getDocumentosPersonaById(req, res){
        try{
            const personaId = req.params.id;
            if (!personaId || personaId == '' || personaId == null || personaId == undefined){
                throw new Error('El id de la persona es requerido');
            }

            const documentosPersona = await DocumentosPersonaService.getDocumentosPersonaById(personaId);

            res.json(documentosPersona);
        }catch(error){
            res.status(400).json({message: error.message});

        }
    }

}

module.exports = new DocumentosPersonaController();