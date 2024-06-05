// src/routes/userRoutes.js
import { Router } from 'express';
import{uploadPhoto,getPhotos,getEventPhotos} from '../controllers/photosController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';


const router = Router();

// Rutas insertar fotos de los eventos

router.post("/:id",  authenticateToken(['user']),  uploadFileMiddleware, uploadPhoto);

router.get("/",  authenticateToken(['user']), getPhotos);
router.get("/:id",  authenticateToken(['user']), getEventPhotos);
export default router;

