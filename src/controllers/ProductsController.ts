import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';
import { Company } from '../models/Company';

import { Product } from '../models/Product';

export default {

    async index(request:Request,response:Response){
      const productsRepository = getRepository(Product)
      const { referral_code } = request.query

      const companyRepository = getRepository(Company)
      const company = await companyRepository.findOne({
        where:{referral_code:referral_code}
      })

      if(request.query.filter){
        
        const company_id = company.id
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;

        
        const totalResults = await productsRepository.count({ where: { company:company_id }});//await productsRepository.count()

       
        const filter = request.query.filter?request.query.filter:'';
       
      
        const products = await productsRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .andWhere("company_id =:company_id",{company_id})
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
        const products = await productsRepository.find({
         
          where:{
            company:company.id
          }
        })
        
        const totalResults = products.length//await productsRepository.count({ where: { company:company.id }});
        
        const result = {
          totalResults,
          products
        }
  
        return response.status(201).json(result)
      }
    },

    async create(request:Request,response:Response){
     
      const {
      name,
      description,
      price,
      category,
      user
    
    } = request.body

    const companyRepository = getRepository(Company)

    const company = await companyRepository.findOneOrFail({
      where:{
        'referral_code':user
      }
    });

    
    const format_price = price
    .replace(',', '.')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  
    const productRepository = getRepository(Product)

    const requestImage = request.file as Express.Multer.File;
   
    const file = requestImage?requestImage.filename:''
    

    const data = {
      name,
      description,
      price:format_price,
      category,
      company:company.id,
      image:file
    }as any

    const product = productRepository.create(data)

    await productRepository.save(product)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const productRepository = getRepository(Product);

    const product = await productRepository.findOneOrFail({
      relations:['company','category'],
      where:{
        'id':id
      }
    });
    
    product.image = `http://192.168.0.103:3333/uploads/${product.image}`
    //product.image = `https://appfood-backend.herokuapp.com/uploads/${product.image}`

    product.price = product.price
    .replace('.', ',')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')


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
      category,
      company
    
    } = request.body

    
    const requestImage = request.file as Express.Multer.File;
   
    const file = requestImage?requestImage.filename:product.image

    const format_price = price
    .replace(',', '.')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    const  data = {
      name,
      description,
      price:format_price,
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