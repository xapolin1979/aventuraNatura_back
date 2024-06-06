
import Photos from '../models/photosModel.js'
import Event from '../models/eventModel.js';
import fs from 'fs';
import path from 'path';

export const uploadPhoto = async (req, res) => {
    try {
     
      if (req.files == undefined) {
        return res.status(400).json({
          code: -101,
          message: 'Please upload a file!'
        });
      }
  
      const eventId = req.params.id; 
      const userId = req.user.id_user; 

 // Verificar si el usuario autenticado es el propietario del evento
    const event = await Event.findByPk(eventId);
    if (!event || event.user_id !== userId) {
      return res.status(403).json({
        code: -4,
        message: "No tienes permiso para cargar una foto en este evento",
      });
    }

    const photosData = req.files.map(file => ({
      event_id: eventId,
      photo: file.filename
    }));
   // Guardar todas las fotos en la base de datos
      await Photos.bulkCreate(photosData);

      req.files.forEach(file => {
        console.log("Guardo la imagen: " + file.filename + " en el id de usuario: " + eventId);
      });
      
      
  
      return res.status(200).json({
        code: 1,
        message: "Uploaded the files successfully",
        files: req.files.map(file => file.originalname)
      });
  
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }
  
      res.status(500).send({
        message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
        error: `${err}`
      });
    }
  };



  export const getPhotos = async (req, res) => {
    try {
     

    if (!req.user) {
      return res.status(401).json({
        code: -1,
        message: "Debes iniciar sesión para ver las fotos",
      });
    }
    
      const photos = await Photos.findAll()
     
      res.status(200).json({
        code: 1,
        message: "lista de photos",
        data: photos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: "Ha ocurrido un error al obtener las fotos",
      });
    }
  };
  

  
  export const getEventPhotos = async (req, res) => {
    try {
      // Obtener el id del evento desde los parámetros de la URL
      const eventId = req.params.id;
  
      // Verificar si el usuario está autenticado
      if (!req.user) {
        return res.status(401).json({
          code: -1,
          message: "Debes iniciar sesión para ver las fotos",
        });
      }
  
      // Buscar las fotos asociadas al evento específico
      const photos = await Photos.findAll({
        where: { event_id: eventId },
      });
  
      // Devolver las fotos encontradas en la respuesta
      res.status(200).json({
        code: 1,
        message: "Lista de fotos del evento",
        data: photos,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: "Ha ocurrido un error al obtener las fotos del evento",
      });
    }
  };



  export const deletePhoto = async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const userId = req.user.id_user;

        console.log(`Intentando eliminar la foto con ID: ${photoId} para el usuario: ${userId}`);

        // Buscar la foto por ID
        const photo = await Photos.findOne({
            where: { id_photos: photoId }
        });

        if (!photo) {
            console.log('Foto no encontrada');
            return res.status(404).json({
                code: -102,
                message: 'Foto no encontrada',
            });
        }

        console.log(`Foto encontrada: ${photo.photo}`);

        const event = await Event.findByPk(photo.event_id);
        if (!event || event.user_id !== userId) {
            console.log('No tienes permiso para eliminar esta foto');
            return res.status(403).json({
                code: -4,
                message: 'No tienes permiso para eliminar esta foto',
            });
        }

        console.log('Permiso verificado. Eliminando foto de la base de datos...');

        // Eliminar el registro de la foto en la base de datos
        await Photos.destroy({
            where: {
                id_photos: photoId,
            },
        });

        console.log('Registro eliminado de la base de datos. Eliminando archivo del sistema de archivos...');

        // Eliminar la foto del sistema de archivos
        const filePath = path.join('./src/uploads/', photo.photo);
        console.log(`Ruta del archivo a eliminar: ${filePath}`);

        try {
            await fs.promises.unlink(filePath);
            console.log(`Foto eliminada del sistema de archivos: ${filePath}`);
        } catch (err) {
            console.error('Error al eliminar la foto del sistema de archivos:', err);
            return res.status(500).json({
                code: -100,
                message: 'Error al eliminar la foto del sistema de archivos',
            });
        }

        return res.status(200).json({
            code: 1,
            message: 'Foto eliminada exitosamente',
        });
    } catch (err) {
        console.error('Error al eliminar la foto:', err);
        res.status(500).json({
            code: -100,
            message: 'Ha ocurrido un error al eliminar la foto',
            error: `${err}`,
        });
    }
};