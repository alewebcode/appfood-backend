import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';


import { City } from '../models/City';

  export default {

    async index(request:Request,response:Response){
      const citiesRepository = getRepository(City)

      if(request.query.filter){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await citiesRepository.count()

        const filter = request.query.filter?request.query.filter:'';
      
        const categories = await citiesRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        const result = {
          totalResults,
          categories
        }

        return response.status(201).json(result)
      }else{
        
        const citiesRepository = getRepository(City)

        const cities = await citiesRepository.find() 
  
        return response.status(201).json(cities)
      }
      

    
    },

    async create(request:Request,response:Response){

    const { name } = request.body

    const cityRepository = getRepository(City)
    
    const  data = { name }

    const city = cityRepository.create(data)

    //await cityRepository.save(City)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const cityRepository = getRepository(City);

    const city = await cityRepository.findOneOrFail(id);
  
    return response.json(city);
  },

  

}