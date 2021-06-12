import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';

import { Segment } from '../models/Segment';

  export default {

    async index(request:Request,response:Response){
      const segmentsRepository = getRepository(Segment)

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await segmentsRepository.count()

        //console.log(totalResults)
        const filter = request.query.filter?request.query.filter:'';

      
        const segments = await segmentsRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        const result = {
          totalResults,
          segments
        }

        return response.status(201).json(result)
      }else{
       
        const segmentsRepository = getRepository(Segment)

        const segments = await segmentsRepository.find() 
  
        return response.status(201).json(segments)
      }
      

    
    },

    async create(request:Request,response:Response){

    const { name, description } = request.body

    const segmentRepository = getRepository(Segment)
    
    const  data = { name,description }

    const segment = segmentRepository.create(data)

    await segmentRepository.save(segment)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const segmentRepository = getRepository(Segment);

    const segment = await segmentRepository.findOneOrFail(id);
    console.log(segment)

   
    return response.json(segment);
  },

  async update(request:Request,response:Response){
    const { id } = request.params;

    const segmentRepository = getRepository(Segment);

    const segment = await segmentRepository.findOneOrFail(id);

    
    const { name, description } = request.body


    const  data = { name, description }


    await segmentRepository.update(segment,data)

    return response.status(201).send();
    
   

    return response.json(segment);
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const segmentRepository = getRepository(Segment);

    const segment = await segmentRepository.findOneOrFail(id);
    
   
    await segmentRepository.delete(segment);

    return response.status(201).send();

  }

}