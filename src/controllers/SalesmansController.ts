import { Request, Response, request } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';


import { Salesman } from '../models/Salesman';
import { User } from '../models/User';

export default {

    async index(request:Request,response:Response){
      const salesmansRepository = getRepository(Salesman)

      const salesmans = await salesmansRepository.find() 

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await salesmansRepository.count()

        //console.log(totalResults)
        const filter = request.query.filter?request.query.filter:'';

      
        const salesmans = await salesmansRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        const result = {
          totalResults,
          salesmans
        }

        return response.status(201).json(result)
      }else{
       
        const salesmansRepository = getRepository(Salesman)

        const salesmans = await salesmansRepository.find() 
  
        return response.status(201).json(salesmans)
      }

      return response.status(201).json(salesmans)
    },

    async create(request:Request,response:Response){

     
      const {
      name,
      birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    
    } = request.body
    
    const userRepository = getRepository(User)

    const password_hash = await bcrypt.hash('123456',8);

    const userData = {
      name,
      email,
      password:password_hash,
      id_user_type:2
    }

    const newUser = userRepository.create(userData);//CRIAÇÃO DE NOVO USUÁRIO A PARTIR DO CADASTRO DO VENDEDOR
    
    const user = await userRepository.save(newUser);
  
    const salesmanRepository = getRepository(Salesman)

    let format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '')

    const  data = {
      name,
      birthdate:format_birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      user:user.id
    }as any

    const salesman = salesmanRepository.create(data)

    await salesmanRepository.save(salesman)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const salesmanRepository = getRepository(Salesman);

    const salesman = await salesmanRepository.findOneOrFail(id,{
      relations:['user']
    });
  

    return response.json(salesman);
  },
  async update(request:Request,response:Response){
    const { id } = request.params;

    const salesmanRepository = getRepository(Salesman);

    const salesman = await salesmanRepository.findOneOrFail(id);

    const {
      name,
      birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    
    } = request.body

    let format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    
    const  data = {
      name,
      birthdate:format_birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      user:1
    }as any


    await salesmanRepository.update(salesman,data)

    return response.status(201).send();
    
   

    //return response.json(company);
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const salesmanRepository = getRepository(Salesman);

    const salesman = await salesmanRepository.findOneOrFail(id);

    await salesmanRepository.delete(salesman);

    return response.status(201).send();

  }

}