import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';

import { Product } from '../models/Product';

export default {

    async index(request:Request,response:Response){

      const productsRepository = getRepository(Product)

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await productsRepository.count()

        //console.log(totalResults)
        const filter = request.query.filter?request.query.filter:'';

      
        const products = await productsRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        const result = {
          totalResults,
          products
        }

        return response.status(201).json(result)
      }else{
       
        const productsRepository = getRepository(Product)

        const products = await productsRepository.find() 
  
        return response.status(201).json(products)
      }
    },

    async create(request:Request,response:Response){
     
      const {
      name,
      description,
      price,
      category,
      company
    
    } = request.body
    
  
    const productRepository = getRepository(Product)

    const requestImage = request.file as Express.Multer.File;
   
    const file = requestImage?requestImage.filename:''
    

    const data = {
      name,
      description,
      price,
      category,
      company,
      image:file
    }

    const product = productRepository.create(data)

    await productRepository.save(product)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = await productRepository.findOneOrFail(id,{
      relations:['category']
    });
    //console.log(product.logo)
    //product.image = `http://192.168.0.103:3333/uploads/${product.image}`
    product.image = `https://appfood-backend.herokuapp.com/uploads/${product.image}`

    console.log(product)

    return response.json(product);
  },
  async update(request:Request,response:Response){
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = await productRepository.findOneOrFail(id);

    
    const {
      name,
      description,
      price,
      category
    
    } = request.body

    
    const requestImage = request.file as Express.Multer.File;
   
    const file = requestImage?requestImage.filename:product.image

    const  data = {
      name,
      description,
      price,
      category,
      image:file
    }


    await productRepository.update(product,data)

    return response.status(201).send();
    
   

    //return response.json(product);
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = await productRepository.findOneOrFail(id);

    await productRepository.delete(product);

    return response.status(201).send();

  }

}