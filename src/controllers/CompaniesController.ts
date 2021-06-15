import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';

import { Company } from '../models/Company';

export default {

    async index(request:Request,response:Response){
      const companiesRepository = getRepository(Company)

      const companies = await companiesRepository.find() 

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await companiesRepository.count()

        //console.log(totalResults)
        const filter = request.query.filter?request.query.filter:'';

      
        const companies = await companiesRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        const result = {
          totalResults,
          companies
        }

        return response.status(201).json(result)
      }else{
       
        const companiesRepository = getRepository(Company)

        const companies = await companiesRepository.find() 
  
        return response.status(201).json(companies)
      }

      return response.status(201).json(companies)
    },

    async create(request:Request,response:Response){
     
      const {
      name,
      trading_name,
      cnpj,
      state_registration,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      phone,
      email,
      delivery,
      pickup_in_place,
      company_indication,
      segment
    
    } = request.body
    
  
    const companyRepository = getRepository(Company)

    const requestLogo = request.file as Express.Multer.File;
   
    const file = requestLogo?requestLogo.filename:''

    const  data = {
      name,
      trading_name,
      cnpj,
      state_registration,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      phone,
      email,
      delivery,
      pickup_in_place,
      company_indication:'',
      segment,
      logo:file
    }

    const company = companyRepository.create(data)

    await companyRepository.save(company)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOneOrFail(id,{
      relations:['segment']
    });
    //company.logo = `http://192.168.0.103:3333/uploads/${company.logo}`
    company.logo = `https://appfood-backend.herokuapp.com/uploads/${company.logo}`


    return response.json(company);
  },
  async update(request:Request,response:Response){
    const { id } = request.params;

    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOneOrFail(id);

    
    const {
      name,
      trading_name,
      cnpj,
      state_registration,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      phone,
      email,
      delivery,
      pickup_in_place,
      company_indication,
      segment
    
    } = request.body

    
    const requestLogo = request.file as Express.Multer.File;

    const file = requestLogo?requestLogo.filename:''

    const  data = {
      name,
      trading_name,
      cnpj,
      state_registration,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      phone,
      email,
      delivery: delivery === 'true',
      pickup_in_place,
      company_indication:'',//null
      segment:segment,
      logo:file
    }


    await companyRepository.update(company,data)

    return response.status(201).send();
    
   

    //return response.json(company);
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const companyRepository = getRepository(Company);

    const company = await companyRepository.findOneOrFail(id);

    await companyRepository.delete(company);

    return response.status(201).send();

  }

}