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
   
    const { id } = req.params;

    const event = await Event.findOne({
      where: { id: id },
      include: [
        { model: Category, attributes: ['name'] },
        { model: User, attributes: ['name'] },
        { model: Photos, attributes: ['photo'] }
      ]
    });

    if (!event) {
      return res.status(404).json({
        code: -6,
        message: "Evento no encontrado",
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Event Detail",
      data:event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener el evento",
    });
  }
};