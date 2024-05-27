import Event from "../models/eventModel.js";
import { validationResult } from "express-validator";
import Category from "../models/categoryModel.js";
import User from "../models/userModel.js";
import Photos from "../models/photosModel.js";
import Participants from "../models/participantsNodel.js";
export const getEvents = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Obtener todos los eventos de la base de datos incluyendo la categoría asociada
    const userId = req.user.id_user; //usuario solo puede ver sus eventos 
    const events = await Event.findAll({
      where: { user_id: userId },
      include: [
        { model: Category, attributes: ['name'] },
        { model: User, attributes: ['name'] },
        { model: Photos, attributes: ['photo'] },
        { model: Participants }
      ]
    }
)
    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Event List",
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





export const getEventById = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id_user; 
    const { id } = req.params;

    // Buscar un evento por su ID en la base de datos
 
    const event = await Event.findOne({
      where: { id_event: id, user_id: userId },
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

export const addEvent = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category_id,name_event, difficulty, max_persons, start_date, end_date, lat, lng, info_event, for_whom, price_per_person, material } = req.body;
    const userId = req.user.id_user;
    
    // Intenta crear un nuevo evento
    const newEvent = await Event.create({
      user_id: userId,
      category_id: category_id,
      name_event:name_event, 
      difficulty: difficulty,
      max_persons: max_persons,
      start_date: start_date,
      end_date: end_date,
      lat: lat,
      lng: lng,
      info_event: info_event,
      for_whom: for_whom,
      price_per_person: price_per_person,
      material: material
    });

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Event Added Successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al añadir el evento",
    });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    const { id } = req.params;
    const { category_id,name_event, difficulty, max_persons, start_date, end_date, lat, lng, info_event, for_whom, price_per_person, material } = req.body;
    const userId = req.user.id_user;

    // Buscar un usuario por su ID en la base de datos
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -3,
        message: "Evento no encontrado",
      });
    }

     // Verificar si el usuario autenticado es el propietario del evento
     if (event.user_id !== userId) {
      return res.status(403).json({
        code: -4,
        message: "No tienes permiso para actualizar este evento",
      });
    }
    
   // Actualizar los campos del evento
 
   event.category_id = category_id;
   event.name_event=name_event
   event.difficulty = difficulty;
   event.max_persons = max_persons;
   event.start_date = start_date;
   event.end_date = end_date;
   event.lat = lat;
   event.lng = lng;
   event.info_event = info_event;
   event.for_whom = for_whom;
   event.price_per_person = price_per_person;
   event.material = material;

// Guardar los cambios en la base de datos
await event.save();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Evento actualizado correctamente",
      data: event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al actualizar el evento",
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const userId = req.user.id_user;

// Buscar el evento por su ID en la base de datos
    const event = await Event.findByPk(id);

// Verificar si el evento existe
 if (!event) {
  return res.status(404).json({
    code: -100,
    message: "Evento no encontrado",
  });
}

// Verificar si el usuario autenticado es el propietario del evento
if (event.user_id !== userId) {
  return res.status(403).json({
    code: -101,
    message: "No tienes permiso para eliminar este evento",
  });
}




    // Buscar un libro por su ID en la base de datos y eliminarlo
    const deleteEvent = await Event.destroy({ where: { id_event: id } });

    // Verificar si el libro fue encontrado y eliminado
    if (!deleteEvent) {
      return res.status(404).json({
        code: -100,
        message: "Event Not Found",
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al eliminar el evento",
    });
  }
};
