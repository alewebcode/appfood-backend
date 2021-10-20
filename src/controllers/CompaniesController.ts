import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';
import * as crypto from "crypto";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Company } from '../models/Company';
import { Product } from '../models/Product';
import { City } from '../models/City';
import { Coupon } from '../models/Coupon';
import { User } from '../models/User';

export default {

    async index(request:Request,response:Response){
      
      const companiesRepository = getRepository(Company)

      const companies = await companiesRepository.find() 
      const { user_referral } = request.query
      
     
      if(request.query.filter){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await companiesRepository.count()

        const filter = request.query.filter?request.query.filter:'';

        const companies = await companiesRepository.createQueryBuilder()
        .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
        .andWhere("user_referral =:user_referral",{user_referral})
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
        const companies = await companiesRepository.find({
          where:{user_referral:user_referral}
        })

        const totalResults = await companiesRepository.count()

        const result = {
          totalResults,
          companies
        }
        
        return response.status(201).json(result)
      }

        //return response.status(201).json(companies)
    },

    async create(request:Request,response:Response){

      const usertoken = request.header('Authorization');
      const token = usertoken.split(' ');
      const decoded = jwt.verify(token[1], 'secret');
     
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

    const userRepository = getRepository(User)

    const password = crypto.randomBytes(4).toString('hex');
    const password_hash = await bcrypt.hash(password,8);

    
    const findUser = await userRepository.findOne(decoded.id);

    const referral_code = crypto.randomBytes(3).toString('hex');

    const userData = {
      name,
      email,
      password:password_hash,
      user_type:4,
      referral_code//findUser.referral_code
    } as any

    const newUser = userRepository.create(userData);//CRIAÇÃO DE NOVO USUÁRIO A PARTIR DO CADASTRO DO VENDEDOR
    
    const user = await userRepository.save(newUser);
  
    const companyRepository = getRepository(Company)

    const requestLogo = request.file as Express.Multer.File;
   
    const file = requestLogo?requestLogo.filename:'';

    //const referral_code = crypto.randomBytes(3).toString('hex');

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
      city:1,
      state,
      phone,
      email,
      delivery,
      pickup_in_place,
      company_indication:'',
      segment,
      logo:file,
      referral_code,
      user_referral:findUser.referral_code
    }as any

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
    company.logo = `http://192.168.0.100:3333/uploads/${company.logo}`
    //company.logo = `https://appfood-backend.herokuapp.com/uploads/${company.logo}`


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

  },

  async filterCities(request:Request,response:Response){
    const companiesRepository = getRepository(Company)
    
    //const companies = await companiesRepository.find() 
    
    const cities = await companiesRepository.createQueryBuilder()
    .select('DISTINCT ("city")')
    .getRawMany()
    
    return response.json(cities);
  },
  async searchCompanies(request:Request,response:Response){
    const companiesRepository = getRepository(Company)
    
    if(request.query.filterProductCompany){
      
      const filter = request.query.filterProductCompany?request.query.filterProductCompany:'';

      const companies = await companiesRepository
      .createQueryBuilder("companies")
      .select(["product.id",
              "product.name",
              "product.image",
              "product.description",
              "product.price",
              "companies.name",
              "coupons.id as coupon_id",
              "coupons.coupon_code as coupon_code",
              "coupons.amount as coupon_amount"])
      .innerJoin("companies.segment","segment_id")
      .innerJoin("companies.products","product")
      .innerJoin(Coupon,"coupons","Product.id = coupons.product_id")
      .where("LOWER(product.name) || LOWER(companies.name) LIKE :name",{ name:`%${filter}%` })
      .andWhere('companies.id <> :id', { id: 1})
      //.andWhere("coupons.active = true")
      .getRawMany();

     
      return response.json(companies);
    }
    else{
      
      const slug = request.query.slug?request.query.slug:'';

      const cityRepository = getRepository(City)

      const city = await cityRepository.findOne({
        where:{slug:slug}
      })

      const companies = await companiesRepository
      .createQueryBuilder("companies")
      .select(["product.id",
              "product.name",
              "product.image",
              "product.description",
              "product.price",
              "companies.name",
              "coupons.id as coupon_id",
              "coupons.coupon_code as coupon_code",
              "coupons.amount as coupon_amount"])
      .innerJoin("companies.segment","segment_id")
      .innerJoin("companies.products","product")
      .innerJoin(Coupon,"coupons","Product.id = coupons.product_id")
      .where('companies.city = :city', { city: city.id })
      .andWhere('companies.id <> :id', { id: 1})
      //.andWhere("coupons.active = true")
      .getRawMany();

      
      return response.json(companies);
      
     
    }
    
  },

  async listProducts(request:Request,response:Response){
    const { id } = request.params;


    const productsRepository = getRepository(Product)

    const products = await productsRepository.find({
      where:{company:id}
    })

    return response.status(201).json(products)

  }
  
  
} 