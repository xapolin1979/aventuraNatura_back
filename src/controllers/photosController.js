
import Photos from '../models/photosModel.js'
import Event from '../models/eventModel.js';

export const uploadPhoto = async (req, res) => {
    try {
     
      if (req.file == undefined) {
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



      // Actualizo la imagen del usuario
      console.log("Guardo la imagen: " + req.file.filename + " en el id de usuario: " + eventId);
  
      await Photos.create({
        event_id: eventId, // Asegúrate de que la columna en tu base de datos sea correcta
        photo: req.file.filename
      });
  
      return res.status(200).json({
        code: 1,
        message: "Uploaded the file successfully: " + req.file.originalname,
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
  