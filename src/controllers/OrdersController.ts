import { Request, Response, request } from 'express';
import bcrypt from 'bcrypt';
import { getRepository,IsNull } from 'typeorm';
import { format, addHours,parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';


import { Coupon } from '../models/Coupon';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Customer } from '../models/Customer';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { Franchisor } from '../models/Franchisor';
import { Franchise } from '../models/Franchise';
import Mail from '../lib/Mail';

export default {

    async index(request:Request,response:Response){
     
      const { referral_code } = request.query

      const companyRepository = getRepository(Company)
      const company = await companyRepository.findOne({
        where:{referral_code:referral_code}
      })

      const orderRepository = getRepository(Order)

      const orders = await orderRepository.find() 

      if(request.query.filter){
        const company_id = company.id

        const { page, limit} = request.query as any

        const offset = (page - 1) * limit;
        
        const totalResults = await orderRepository.count()

       
        const filter = request.query.filter?request.query.filter:'';

      
        const orders = await orderRepository.createQueryBuilder()
        .where("company_id =:company_id",{company_id})
        .offset(offset)
        .limit(limit)
        .getMany()

        
        const result = {
          totalResults,
          orders
        }
       
        
        return response.status(201).json(result)
      }else{
       
        const orderRepository = getRepository(Order)
        
        const orders = await orderRepository.find({
          where:{
            company:company.id
          },
          relations:['user']
        });
       

        const totalResults = orders.length

        const result = {
          totalResults,
          orders
        }
       
        
        return response.status(201).json(result)
      }

       
    },

    async create(request:Request,response:Response){

      const date = new Date();

      const {
      amount,
      delivery,
      status,
      customer,
      company,
      items

    
    } = request.body

    const userRepository = getRepository(User);
    
    const userCustomer = await userRepository.findOne(customer);
    
    const  data = {
      date,
      amount,
      delivery,
      status,
      company,
      customer:78,
      user:userCustomer.id

    } as any;

    
    const orderRepository = getRepository(Order)

    const order = orderRepository.create(data)

    const newOrder = await orderRepository.save(order)

    const orderItemRepository = getRepository(OrderItem)

    const couponRepository = getRepository(Coupon)


   items.forEach(async (item) =>{
      
      let orderItem = { product:item.product_id, order:newOrder, coupon:item.coupon_id} as any;

 
      const coupon = await couponRepository.findOneOrFail(item.coupon_id);


      couponRepository.update(coupon,{active:false})

      const order = orderItemRepository.create(orderItem)

      orderItemRepository.save(order)
    })

    return response.status(201).send();
  },


  async show(request:Request,response:Response){

    const { id } = request.params;

    const orderRepository = getRepository(Order);

    const order = await orderRepository.findOneOrFail(id);
  

    return response.json(order);
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

  },
  async listCoupons(request:Request,response:Response){
    const { id } = request.params;

    const couponRepository = getRepository(Coupon);
    
    const coupons = await couponRepository.createQueryBuilder()
      .innerJoinAndSelect("Coupon.product","product_id")
      .where(`company_id = ${id}`)
      .andWhere("Coupon.active = true")
      .getMany();

  

    return response.json(coupons);
  },
  async detail(request:Request,response:Response){
    const { id } = request.params;

    const orderItemRepository = getRepository(OrderItem);

    const ordersItems = await orderItemRepository.createQueryBuilder('orderItem')
    .innerJoinAndSelect("orderItem.product","product_id")
    .innerJoinAndSelect("orderItem.coupon","coupon_id")
    .where(`order_id = ${id}`)
    .getMany();

    return response.json(ordersItems);
  },

  async cancel(request:Request,response:Response){
    const { id } = request.params;

    const orderRepository = getRepository(Order);

    const order = await orderRepository.findOneOrFail(id);

    const  data = {
     status:'Cancelado'
    }

    await orderRepository.update(order,data)

  },
  async approve(request:Request,response:Response){
    const { id } = request.params;

    const orderRepository = getRepository(Order);
   
    const order = await orderRepository.findOne({
      relations:['user','company'],
      where:{
        'id':id
      }
    });

    const  data = {
     status:'Concluído'
    }

    await orderRepository.update(order,data)

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(order.user);
   
    if(order.company.id == 1){
      order.user.user_referral = null
    }
   
    const userRef = await userRepository.findOne({
      where: [
        {referral_code:order.user.user_referral},
        {referral_code:user.referral_code}
      ],
      relations:['user_type']
    })


    if(userRef.user_type.id == 4){ //Empresa

      if(order.company.id == 1){
        const total_cashback = (10 /100 * order.amount)

        const  data = {
          total_cashback
        }
       
        const companyRepository = getRepository(Company);
        const company = await companyRepository.findOne({
          where:{referral_code:user.referral_code},
        
          })

        
        await companyRepository.update(company,data)

      }else{
        const companyRepository = getRepository(Company);
        const company = await companyRepository.findOne({
          where:{referral_code:order.user.user_referral},
        
        })
  
        const commission = Number(company.commission) + Number((4 /100 * order.amount))
  
          const  data = {
            commission
          }
     
         await companyRepository.update(company,data)
  
  
         const franchisorRepository = getRepository(Franchisor);
         const franchisor = await franchisorRepository.findOne(1);
  
          const  dataFinance = {
            total_amount:commission
          }
        
         await franchisorRepository.update(franchisor,dataFinance)
      }

     

    }
    if(userRef.user_type.id == 5){ //Franquia
     
      const franchiseRepository = getRepository(Franchise);
      const franchise = await franchiseRepository.findOne({
        where:{referral_code:order.user.user_referral},
      
        })

      if(order.company.id == 1){
       
        const total_cashback = Number(franchise.total_cashback) + Number((10 /100 * order.amount))

         const  data = {
          total_cashback
        }
        
        await franchiseRepository.update(franchise,data)

      }else{
        
        const commission = Number(franchise.commission) + Number((4 /100 * order.amount))
  
        const  data = {
            commission,
            total_amount:commission
        }

        await franchiseRepository.update(franchise,data)//atualiza comissão franquia
        
        const franchisorRepository = getRepository(Franchisor);
        const franchisor = await franchisorRepository.findOne(1);
        
        const commission_franchisor = Number(franchisor.commission) + Number((4 /100 * order.amount))

        const  data_franchisor = {
          commission:commission_franchisor,
          total_amount:commission
        }
        
        await franchisorRepository.update(franchisor,data_franchisor)//atualiza comissão em dinheiro para franqueadora
      }

     

    }
    if(userRef.user_type.id == 1){ //Franqueadora
      
      const franchisorRepository = getRepository(Franchisor);
      const franchisor = await franchisorRepository.findOne(1);
      
      const commission = Number(franchisor.commission) + Number((4 /100 * order.amount))

      
      const total_amount = Number(franchisor.total_amount) +  Number((4 /100 * order.amount))
      
      const  dataFinance = {
        commission,
        total_amount
      }
    
     await franchisorRepository.update(franchisor,dataFinance)
     
      
    }
    
    if(userRef.user_type.id == 3){ //Cliente
      const franchisorRepository = getRepository(Franchisor);
      const franchisor = await franchisorRepository.findOne(1);
     
      if(order.company.id == 1){
        const total_cashback = (10 /100 * order.amount)

        const  data = {
          total_cashback
        }

        const customerRepository = getRepository(Customer);
        const customer = await customerRepository.findOne({
          where:{user:order.user},
        
          })

        await customerRepository.update(customer,data)

      }else{
          if(order.user.user_referral){
            
       
            const customerRepository = getRepository(Customer);
            const customer = await customerRepository.findOne({
              where:{referral_code:order.user.user_referral},
            
              })
              const commission = (4 /100 * order.amount)
  
              const  data = {
                  commission
              }
              await customerRepository.update(customer,data)//atualiza comissão cliente
      
              const  dataFinance = {
                total_amount:commission
              }
           
              await franchisorRepository.update(franchisor,dataFinance)//atualiza comissão em dinheiro franqueadora
  
          }else{
            
            const commission = (8 /100 * order.amount)
            const total_amount = (4 /100 * order.amount)
            const  data = {
                commission,
                total_amount
            }
              await franchisorRepository.update(franchisor,data)
          }
      }

    }
    return response.status(201).send();
  },
  async sendMailNewOrder(request:Request,response:Response){

    const {
      amount,
      delivery,
      status,
      customer,
      company,
      items

    
    } = request.body;
    const userRepository = getRepository(User);
    
    const userCustomer = await userRepository.findOne(customer);

    const companyRepository = getRepository(Company);
    
    const data_company = await companyRepository.findOne(company);

    const data = {
      amount,
      delivery,
      status,
      customer:userCustomer,
      company,
      items
    }
   
    try{
      await Mail.sendMail({
        from:'teste <teste@teste.com.br>',
        to:`< ${data_company.email} >`,
        subject:'Novo Pedido',
        template: 'new_order',
        context: { data }
      })

      return response.status(201).json(true)
    }catch(err){


    }
    

  }
}