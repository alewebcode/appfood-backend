import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import { is } from 'date-fns/locale';
import { Salesman } from '../models/Salesman';
import { Customer } from '../models/Customer';

import Mail from '../lib/Mail';

  export default {

    async index(request:Request,response:Response){
      const usersRepository = getRepository(User)
      const { referral_code } = request.query

      if(request.query.filter){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;

        const filter = request.query.filter?request.query.filter:'';
        console.log(filter)
      
        const users = await usersRepository.createQueryBuilder()
        .innerJoinAndSelect("User.user_type","id_user_type")
        .where("LOWER(User.name) LIKE :name",{ name:`%${filter}%` })
        .andWhere(`referral_code = :referral_code OR user_referral = :referral_code`,{
          referral_code:referral_code,
          user_referral:referral_code
        })
        .offset(offset)
        .limit(limit)
        .getMany()
       

        const totalResults = users.length

        const result = {
          totalResults,
          users
        }

        return response.status(201).json(result)
      }else{
       
        const usersRepository = getRepository(User)

        const users = await usersRepository.find({
          where: [
            {referral_code:referral_code},
            {user_referral:referral_code}
          ],
          relations:['user_type']
        });

        const totalResults = users.length

        const result = {
          totalResults,
          users
        }
        
  
        return response.status(201).json(result)
      }
      

    
    },

    async create(request:Request,response:Response){

    const { name, email,password } = request.body;

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({email});
    
    if(userExists){
      return response.status(400).json({error:'User already exists'});
    }

    //const password_hash = await bcrypt.hash(password,8);
    

    const  data = { 
      name,
      email,
      password,
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
  async authenticate(request:Request,response:Response){
    try{
     
      const {email,password} = request.body
     
      const userRepository = getRepository(User);
     
      const user = await userRepository.findOne({email},{relations:['user_type']})

      if(!user){
        return response.status(401).json({error :"User not found"})
      }
      
     
      const isValidPassword = await bcrypt.compare(password,user.password);

      if(!isValidPassword){
        return response.status(401).json({error :"Password is invalid"})
      }
     
     

      const token = jwt.sign({id:user.id,user_type:user.user_type},'secret',{expiresIn:'1d'});

      
      // if(user.user_type.id == 2){
      //     const salesmanRepository = getRepository(Salesman);
  
      //     const salesman = await salesmanRepository.find({
      //       where:{user:user.id}
      //     })
          
      //     user.referral_code = salesman[0].referral_code
      // }else if(user.user_type.id == 3){
      //   const customerRepository = getRepository(Customer);
  
      //   const customer = await customerRepository.find({
      //     where:{user:user.id}
      //   })
        
      //   user.referral_code = customer[0].referral_code
      // }else{
        //user.referral_code = user.user_referral
      //}
  
      delete user.password;

      return response.json({
        user,
        token
      });
      
    }catch(err){
      
      
      return response.status(401).json({error: "User authentication failed"});
    }
    
    
  },

  async sendMailIndication(request:Request,response:Response){

    const { email,referralLink } = request.body;
    
    try{
      await Mail.sendMail({
        from:'teste <teste@teste.com.br>',
        to:`< ${email} >`,
        subject:'Indicação',
        template: 'indication',
        context: { referralLink }
      })

      return response.status(201).json(true)
    }catch(err){


    }
    

  } 

}