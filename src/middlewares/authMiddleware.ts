import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req:Request, res:Response, next: NextFunction,
){

  const { authorization } = req.headers

  if(!authorization){
    res.status(401).send();
  }

  const token =  authorization.replace('Bearer','').trim();
 
  try{
    const data = jwt.verify(token,'secret');
    const { id,id_user_type } = data;

    if(id_user_type == 3){
     
      return res.status(401).send();
    }

    req.userId = id;

    return next();

  }catch{
    return res.status(401).send();
  }
}