const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
class OrderController{
    client;
    constructor() {
        this.transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          secure: false,
          auth: {
            user: "avtoservis2234@gmail.com",
            pass: "vflmscjupmvloydo",
          },
        });
      }

    async SendOrder(order){

        console.log('SendOrder start');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                   name:order.name,
                   phone:order.phone,
                   email:order.email,
                })
        };
        try {
          await fetch('http://localhost:5083/Order',requestOptions)
            .then(response => response.json())
            .then(res=>this.client=res)
        }
        catch{
          return this.client, console.log('SendOrder end(without server)');
        }
        return this.client, console.log('SendOrder end');
    }
    async sendActivationMail(to, link) {
        console.log('sendActivationMail start');
        await this.transporter.sendMail({
          from: "avtoservis2234@gmail.com",
          to,
          subject: "Активация акаунта",
          text:"",
          html:
          `<div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
          </div>
          `
        });
        console.log('sendActivationMail end');
      }
    async SendActivasion(order){
        console.log('SendActivasion start');
        var linkTo = order.email;//this.client.email;
        var token = await bcrypt.hash(linkTo, 8);
        var id = 0//this.client.id;
        
        console.log('Client id: '+0);
        console.log('Client email: '+order.email)
        console.log('Token: '+token);
          await this.sendActivationMail(linkTo,`http://localhost:3000/order/activate/${token}/${id}`);
        console.log('SendActivasion end');
    }
    IsMatch(email,token){
        return bcrypt.compareSync(email, token);
    }
}

module.exports = new OrderController();