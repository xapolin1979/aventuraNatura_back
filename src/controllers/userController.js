import User from '../models/userModel.js';
import Photos from '../models/photosModel.js'
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';
//https://www.bezkoder.com/node-js-express-file-upload/


export const getUser = async (req, res) => {
  try {

    const user_data = {
      "id_user": req.user.id_user,
      "email": req.user.email,
      "name": req.user.name,
      "phone": req.user.phone,
      "created_at": req.user.created_at,
      "updated_at": req.user.updated_at
    };

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'User Detail',
      data: user_data 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while obtaining the USER'
    });
  }
};

