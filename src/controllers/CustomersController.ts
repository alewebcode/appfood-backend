import { Request, Response, request } from 'express';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import * as crypto from "crypto";
import jwt from 'jsonwebtoken';


import { Salesman } from '../models/Salesman';
import { User } from '../models/User';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';

export default {

  async index(request:Request,response:Response){
      
    const customersRepository = getRepository(Customer)

    const customers = await customersRepository.find() 
    const { user_referral } = request.query

    if(request.query.filter){
      
      const { page, limit} = request.query as any

      const offset = (page - 1) * limit;
      
      const totalResults = await customersRepository.count()

      const filter = request.query.filter?request.query.filter:'';

      const customers = await customersRepository.createQueryBuilder()
      .where("LOWER(name) LIKE :name",{ name:`%${filter}%` })
      .andWhere("user_referral =:user_referral",{user_referral})
      .offset(offset)
      .limit(limit)
      .getMany()

      const result = {
        totalResults,
        customers
      }

      return response.status(201).json(result)
    }else{

      
      const customersRepository = getRepository(Customer)
      const customers = await customersRepository.find({
        where:{user_referral:user_referral}
      })

      const totalResults = customers.length

      const result = {
        totalResults,
        customers
      }
      
      
      return response.status(201).json(result)
    }

     
    },
    async create(request:Request,response:Response){

      const usertoken = request.header('Authorization');
      const token = usertoken.split(' ');
      const decoded = jwt.verify(token[1], 'secret');
      
      const userRepository = getRepository(User)

     
      
      
      const {
      name,
      birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    
    } = request.body
    

    const password = crypto.randomBytes(4).toString('hex');
    const password_hash = await bcrypt.hash(password,8);

    
    const findUser = await userRepository.findOne(decoded.id);

    const referral_code = crypto.randomBytes(3).toString('hex');

    const userData = {
      name,
      email,
      password:password_hash,
      user_type:3,
      referral_code//findUser.referral_code
    } as any

    const newUser = userRepository.create(userData);//CRIAÇÃO DE NOVO USUÁRIO A PARTIR DO CADASTRO DO VENDEDOR
    
    const user = await userRepository.save(newUser);
  
    const customerRepository = getRepository(Customer)

    let format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '')

   
    const  data = {
      name,
      birthdate:format_birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      user:user,
      referral_code,
      user_referral:findUser.referral_code
    }as any


    const customer = customerRepository.create(data)

    await customerRepository.save(customer)
    // if(decoded.user_type.id == 6){
    //   const companyUser = await userRepository.findOneOrFail(decoded.id,{
    //     relations:['company']
    //   });

    //   const newData = {
    //     ...data,
    //     user_referral:companyUser.company.referral_code
    //   }

    //   const customer = customerRepository.create(newData)

    //   await customerRepository.save(customer)

      

    // }else{
      
    //   const salesmanRepository = getRepository(Salesman)
    //   const salesmanUser = await salesmanRepository.find({
    //     where:{user:decoded.id}
    //   })

    //   const newData = {
    //     ...data,
    //     user_referral:salesmanUser[0]['referral_code']
    //   }

    //    const customer = customerRepository.create(newData)

    //   await customerRepository.save(customer)
    // }

    return response.status(201).send();

   

  },

  async signUp(request:Request,response:Response){

    const user_referral = request.query.refferer?request.query.refferer:'';

    const {
      name,
      phone,
      email,
      password
    
    } = request.body;
    
    const userRepository = getRepository(User)

    const password_hash = await bcrypt.hash(password,8);

    const userData = {
      name,
      email,
      password:password_hash,
      user_type:3
    }as any


    const newUser = userRepository.create(userData);
    
    const user = await userRepository.save(newUser);
  
    const customerRepository = getRepository(Customer)

    const referral_code = crypto.randomBytes(3).toString('hex');

    const  data = {
      name,
      phone,
      email,
      password,
      user:user,
      referral_code,
      user_referral
    }as any

    const customer = customerRepository.create(data)

    await customerRepository.save(customer)
    
    const token = jwt.sign({id:data.user.id,id_user_type:data.user.user_type},'secret',{expiresIn:'1d'});

    //return response.status(201).json(customer);
    return response.json({
      user:customer,
      token
    });
  },

  async show(request:Request,response:Response){
    const { id } = request.params;

    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOneOrFail(id);
  

    return response.json(customer);
  },
  async update(request:Request,response:Response){
    const { id } = request.params;
  

    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOneOrFail(id);

    const {
      name,
      birthdate,
      cpf,
      phone,
      email,
      zip_code,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    
    } = request.body

    let format_birthdate = new Date(birthdate).toISOString().replace(/T/, ' ').replace(/\..+/, '')
    
    const  data = {
      name,
      birthdate:format_birthdate,
      cpf,
      phone,
      email,
      zip_code:zip_code?zip_code:null,
      street,
      number:number?number:null,
      complement,
      neighborhood,
      city,
      state,
      //user:28
    }as any


    await customerRepository.update(customer,data)

    return response.status(201).send();

  },

  async delete(request:Request,response:Response){
    const { id } = request.params;

    const salesmanRepository = getRepository(Salesman);

    const salesman = await salesmanRepository.findOneOrFail(id);

    await salesmanRepository.delete(salesman);

    return response.status(201).send();

  },
  async orders(request:Request,response:Response){

    const { id } = request.params;

    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({where: { user:id } });

   
    const orderRepository = getRepository(Order);

    const orders = await orderRepository.find({where: { customer} });
    
    // const orderRepository = getRepository(Order);

    // const orders = await orderRepository.find({ 
    //   //relations:["orderItems"],
    //   where:{
    //     customer:customer
    //   } 
    // });
    
    // const orderItemRepository = getRepository(OrderItem);

    // const ordersItems = await orderRepository.createQueryBuilder('order')
    // .innerJoinAndSelect("order.orderItems","orderItem") 
    // //.innerJoinAndSelect("order.products","product")
    // // .innerJoinAndSelect("OrderItem.coupon","coupon_id")
    // .where('order.customer = customer')
    // .getMany();

    //console.log(ordersItems)

    return response.status(201).json(orders)
  },

  async account(request:Request,response:Response){
    const { id } = request.params;

    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({where: { user:id } });

    return response.json(customer);
  },

}