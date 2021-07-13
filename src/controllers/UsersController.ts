import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '../models/User';

  export default {

    async index(request:Request,response:Response){
      const usersRepository = getRepository(User)

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await usersRepository.count()

        //console.log(totalResults)
        const filter = request.query.filter?request.query.filter:'';

      
        const users = await usersRepository.createQueryBuilder()
        .innerJoinAndSelect("User.user_type","id_user_type")
        .where("LOWER(User.name) LIKE :name",{ name:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        const result = {
          totalResults,
          users
        }

        return response.status(201).json(result)
      }else{
       
        const usersRepository = getRepository(User)

        const users = await usersRepository.findOneOrFail({
          relations:['user_type']
        });

        
  
        return response.status(201).json(users)
      }
      

    
    },

    async create(request:Request,response:Response){

    const { name, email,password } = request.body

    const password_hash = await bcrypt.hash(password,8);

    const userRepository = getRepository(User)
    
    const  data = { 
      name,
      email,
      password:password_hash,
      user_type:1 
    }as any

    const user = userRepository.create(data)

    await userRepository.save(user)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);
    

    return response.json(user);
  },

  async update(request:Request,response:Response){
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    
    const { name, email } = request.body


    const  data = { name, email }


    await userRepository.update(user,data)

    return response.status(201).send();
    
  
    return response.json(user);
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);
    
   
    await userRepository.delete(user);

    return response.status(201).send();

  },
  async inactivate(request:Request,response:Response){
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    
    const  data = { active:false }


    await userRepository.update(user,data)

    return response.status(201).send();
    
  
  }, 
  async activate(request:Request,response:Response){
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id);

    
    const  data = { active:true }

    await userRepository.update(user,data)

    return response.status(201).send();
    
  
  }, 

}