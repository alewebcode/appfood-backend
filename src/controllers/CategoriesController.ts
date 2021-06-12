import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';

import { Category } from '../models/Category';

  export default {

    async index(request:Request,response:Response){
      const categoriesRepository = getRepository(Category)

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await categoriesRepository.count()

        const filter = request.query.filter?request.query.filter:'';
      
        const categories = await categoriesRepository.createQueryBuilder()
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
        
        const categoriesRepository = getRepository(Category)

        const categories = await categoriesRepository.find() 
  
        return response.status(201).json(categories)
      }
      

    
    },

    async create(request:Request,response:Response){

    const { name } = request.body

    const categoryRepository = getRepository(Category)
    
    const  data = { name }

    const category = categoryRepository.create(data)

    await categoryRepository.save(category)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOneOrFail(id);
  
    return response.json(category);
  },

  async update(request:Request,response:Response){
    const { id } = request.params;

    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOneOrFail(id);

    
    const { name } = request.body


    const  data = { name }


    await categoryRepository.update(category,data)

    return response.status(201).send();
    
   

    return response.json(category);
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOneOrFail(id);
    
   
    await categoryRepository.delete(category);

    return response.status(201).send();

  }

}