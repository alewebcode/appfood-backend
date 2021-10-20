import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';
import { resolve } from 'path';



class Mail {
  transporter: nodemailer;

  constructor() {

    this.transporter = nodemailer.createTransport(mailConfig);

    this.configureTemplates();
  }
  configureTemplates() {
    const hbs = require('nodemailer-express-handlebars');
    const viewPath = resolve(__dirname, '..', 'views', 'emails');

    const hbsConfig = {
      viewEngine: {
        extName: '.hbs',
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs',
      },
      viewPath,
      extName: '.hbs'
    }
    this.transporter.use('compile', hbs(hbsConfig));
    //this.transporter.use('compile', hbs(hbsConfig));
  
  }
  
  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    })
  }
 
 

  

  // async function newSendEmail(message):Promise<void>  {

  //   await transporter.sendMail({
  //     ...mailConfig.default,
  //     ...message,
  //   })

  // }
  


}
export default new Mail();