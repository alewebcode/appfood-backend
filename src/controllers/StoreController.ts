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

  async products(request:Request,response:Response){
    const companiesRepository = getRepository(Company)
    
    if(request.query.filterProductCompany){
      
      const filter = request.query.filterProductCompany?request.query.filterProductCompany:'';

      const products = await companiesRepository
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
      .where("LOWER(product.name) LIKE :name",{ name:`%${filter}%` })
      .andWhere('companies.id = :id', { id: 1})
      .getRawMany();

     

      return response.json(products);
    }
    else{
      
      

      const products = await companiesRepository
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
      .where('companies.id = :id', { id: 1})
      //.andWhere("coupons.active = true")
      .getRawMany();

      
      return response.json(products);
      
     
    }
    
  },
  
  
} 