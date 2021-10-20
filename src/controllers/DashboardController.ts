import { jwt } from 'jsonwebtoken';
import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';
import { Franchisor } from '../models/Franchisor';

import { Segment } from '../models/Segment';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { Franchise } from '../models/Franchise';
import { Customer } from '../models/Customer';

  export default {

    async finance(request:Request,response:Response){
      
      const { id } = request.params;
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(id,{ relations:['user_type']});
      
   
      if(user.user_type.id == 1){

        const franchisorRepository = getRepository(Franchisor);

        const franchisor = await franchisorRepository.findOne();
        
        franchisor.user_type = user.user_type.id 

        return response.json(franchisor);
      }
      if(user.user_type.id == 4){

        const companyRepository = getRepository(Company);
        const company = await companyRepository.findOne({
          where:{referral_code:user.referral_code},
        
        })

        return response.json(company);
      }
      if(user.user_type.id == 3){

        const customerRepository = getRepository(Customer);
        const customer = await customerRepository.find({
          where:{user:user},
        
        })
        

        return response.json(customer);
      }
      if(user.user_type.id == 5){

        const franchiseRepository = getRepository(Franchise);
        const franchise = await franchiseRepository.findOne({
          where:{referral_code:user.referral_code},
        
        })

        return response.json(franchise);
      }

     

    
    },

 

}