// src/routes/userRoutes.js
import { Router } from 'express';
import { getEvents, getEventById, addEvent, updateEvent, deleteEvent } from '../controllers/eventController.js'; 
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {eventValidator} from '../validations/Event.Validation.js'
import { idValidator } from '../validations/generic.Validation.js'

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/' , authenticateToken(['user']), getEvents);
router.get('/:id',  authenticateToken(['user']),  idValidator, getEventById);
router.post('/', authenticateToken(['user']),  eventValidator, addEvent);
router.patch('/:id', authenticateToken(['user']), idValidator, eventValidator, updateEvent);
router.delete('/:id', authenticateToken(['user']), idValidator, deleteEvent);


export default router;
