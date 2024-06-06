// src/routes/userRoutes.js
import { Router } from 'express';
import{uploadPhoto,getPhotos,getEventPhotos,deletePhoto} from '../controllers/photosController.js'
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';


const router = Router();

// Rutas insertar fotos de los eventos

router.post("/:id",  authenticateToken(['user']),  uploadFileMiddleware, uploadPhoto);
router.get("/",  authenticateToken(['user']), getPhotos);
router.get("/:id",  authenticateToken(['user']), getEventPhotos);
router.delete('/:photoId', authenticateToken(['user']), (req, res, next) => {
    console.log(`Solicitud DELETE recibida para la foto con ID: ${req.params.photoId}`);
    next();
}, deletePhoto);
export default router;


