// src/routes/userRoutes.js
import { Router } from 'express';
import {getEventGeneral,getEventGeneralById } from  '../controllers/eventosGeneralesController.js'


const router = Router();

router.get('/',   getEventGeneral);
router.get('/:id',   getEventGeneralById);


export default router;