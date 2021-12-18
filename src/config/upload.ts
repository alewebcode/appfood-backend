import { request } from  'express';
import multer from 'multer';
import path from 'path';

const uploadFolder = path.join(__dirname, '..','..','uploads')

export default {
  directory:uploadFolder,
  storage: multer.diskStorage({
    destination:uploadFolder,//path.join(__dirname, '..','..','uploads'),
    filename: (request, file,cb) => {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null,filename)
    }
  })
}