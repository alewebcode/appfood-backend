import { Request, Response, request } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { format, addHours,parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';


import { Coupon } from '../models/Coupon';

export default {

    async index(request:Request,response:Response){
      const couponRepository = getRepository(Coupon)

      const coupons = await couponRepository.find() 

      if(request.query){
        
        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await couponRepository.count()

       
        const filter = request.query.filter?request.query.filter:'';

      
        const coupons = await couponRepository.createQueryBuilder()
        .where("LOWER(description) LIKE :description",{ description:`%${filter}%` })
        .where("LOWER(coupon_code) LIKE :coupon_code",{ coupon_code:`%${filter}%` })
        .offset(offset)
        .limit(limit)
        .getMany()

        
        const result = {
          totalResults,
          coupons
        }
       
        
        return response.status(201).json(result)
      }else{
       
        const couponRepository = getRepository(Coupon)

        const coupons = await couponRepository.find() 
  
        return response.status(201).json(coupons)
      }

        return response.status(201).json(coupons)
    },

    async create(request:Request,response:Response){

      const dateNow = new Date();

      const addedDate = addHours(dateNow, 72);

      const expirate_date = format(addedDate, 'Y-MM-dd HH:mm');
     
      const {
      description,
      amount,
      coupon_code,
      product

    
    } = request.body

    const format_amount = amount
    .replace(',', '.')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    
    
    const  data = {
      description,
      amount:format_amount,
      expiration_date:expirate_date,
      coupon_code,
      product
    }
    const couponRepository = getRepository(Coupon)

    const coupon = couponRepository.create(data)

    await couponRepository.save(coupon)

    return response.status(201).send();
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const couponRepository = getRepository(Coupon);

    const coupon = await couponRepository.findOneOrFail(id,{
      relations:['product']
    });
  

    return response.json(coupon);
  },
  async update(request:Request,response:Response){
    const { id } = request.params;

    const couponRepository = getRepository(Coupon);

    const coupon = await couponRepository.findOneOrFail(id);

    const {
      description,
      amount,
      coupon_code,
      product
    
    } = request.body

    const format_amount = amount
    .replace(',', '.')
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    
    
    const  data = {
      description,
      amount:format_amount,
      expiration_date:coupon.expiration_date,
      coupon_code,
      product
    }


    await couponRepository.update(coupon,data)

    return response.status(201).send();
 
  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const couponRepository = getRepository(Coupon);

    const coupon = await couponRepository.findOneOrFail(id);

    await couponRepository.delete(coupon);

    return response.status(201).send();

  }

}