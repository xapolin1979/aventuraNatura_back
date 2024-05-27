// src/routes/userRoutes.js
import { Router } from 'express';
import {addParticipants,updateParicipants,deleteParticipants} from '../controllers/participantsController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js';


const router = Router();

router.post('/', authenticateToken(['user']),  addParticipants);
router.patch('/:id', authenticateToken(['user']),updateParicipants);
router.delete('/:id', authenticateToken(['user']),deleteParticipants);

export default router;
