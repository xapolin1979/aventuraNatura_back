import { ConnectionAcquireTimeoutError } from "sequelize";
import Event from "../models/eventModel.js";
import Participants from "../models/participantsNodel.js";
export const getParticipantsByEventId = async (req, res) => {
  try {
    const { event_id } = req.params;

    // Verifica si el event_id existe en la base de datos
    const existingEvent = await Event.findByPk(event_id);
    if (!existingEvent) {
      return res.status(400).json({
        code: -1,
        message: "El evento con el ID proporcionado no existe",
      });
    }

    // Busca los participantes con el mismo event_id
    const participants = await Participants.findAll({
      where: {
        event_id: event_id,
      },
    });

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: `Participantes del evento con ID ${event_id}`,
      data: participants,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al obtener los participantes del evento",
    });
  }
};



 export const addParticipants = async (req, res) => {
    try {
    const { event_id, name,surname, email, phone, persons } = req.body;

     // Verifica si el event_id existe en la base de datos
     const existingEvent = await Event.findByPk(event_id);
     if (!existingEvent) {
       return res.status(400).json({
         code: -1,
         message: "El evento con el ID proporcionado no existe",
       });
     }

 // Verifica si el email del participante ya está registrado en el evento
 const participantExists = await Participants.findOne({
  where: {
    event_id: event_id,
    email: email,
  },
});
if (participantExists) {
  return res.status(400).json({
    code: -2,
    message: "El participante ya está registrado en este evento",
  });
} 


    // Intenta crear un nuevo participante
    const newEvent = await Participants.create({
        event_id: event_id,
        name: name,
        surname:surname, 
        email: email,
        phone: phone,
        persons: persons,

    });

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "nuevo participante",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al añadir el participante",
    });
  }
};


export const updateParicipants = async (req, res) => {
  try {
  
   
    const { id } = req.params;
    const { event_id, name,surname, email, phone, persons } = req.body;

    // Buscar un usuario por su ID en la base de datos
    const participant = await Participants.findByPk(id);
    if (!participant) {
      return res.status(404).json({
        code: -3,
        message: "Participante no encontrado",
      });
    }
    
   // Actualizar los campos del participante
   participant.event_id= event_id,
   participant.name=name,
   participant.surname=surname, 
   participant.email=email,
   participant.phone=phone,
   participant.persons=persons,

// Guardar los cambios en la base de datos
await participant.save();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "participante actualizado correctamente",
      data: participant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al actualizar el participante",
    });
  }
};

export const deleteParticipants = async (req, res) => {
  try {
    
    const { id } = req.params;

    // Buscar id participante para borrarlo
    const deleteEvent = await Participants.destroy({ where: { id_participants: id } });

    // Verificar si el participante fue encontrado y eliminado
    if (!deleteEvent) {
      return res.status(404).json({
        code: -100,
        message: "Participante no encontrado no se puede eliminar",
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: "Participante eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: "Ha ocurrido un error al eliminar el participante",
    });
  }
};
 