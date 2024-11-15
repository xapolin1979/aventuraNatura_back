import Event from "../models/eventModel.js";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";
import Photos from "../models/photosModel.js";

export const getEventGeneral = async (req, res) => {
  try {
   
    const events = await Event.findAll({include: [
        { model: Category, attributes: ['name'] },
        { model: User, attributes: ['name'] },
        { model: Photos, attributes: ['photo'] }
      ]})
    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Eventos generales",
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener los eventos",
    });
  }
};





export const getEventGeneralById = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id); // Convertir el ID a un número entero

    if (isNaN(eventId)) {
      // Si el ID no es un número válido, enviar una respuesta 400 (Solicitud incorrecta)
      return res.status(400).json({
        code: -1,
        message: "El ID del evento proporcionado no es válido",
      });
    }

    // Buscar el evento por su ID e incluir las relaciones Category, User y Photos
    const event = await Event.findByPk(eventId, {
      include: [
        { model: Category, attributes: ['name'] },
        { model: User, attributes: ['name'] },
        { model: Photos, attributes: ['photo'] }
      ]
    });

    if (!event) {
      // Si no se encuentra el evento, enviar una respuesta 404 (No encontrado)
      return res.status(404).json({
        code: -6,
        message: "Evento no encontrado",
      });
    }

    // Enviar una respuesta con el detalle del evento encontrado
    res.status(200).json({
      code: 1,
      message: "Detalle del evento",
      data: event,
    });
  } catch (error) {
    console.error(error);
    // En caso de error, enviar una respuesta 500 (Error interno del servidor)
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener el evento",
    });
  }
};
