const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
class OrderController{

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
        console.log("enter in SendOrder");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                    order
                })
        };
        await fetch('/serverC#/order/new',requestOptions)
            .then(response => response.json())
            .then(res=>data=res)    
            return data;
    }
    async sendActivationMail(to, link) {
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

      }
    async SendActivasion(order){
        var linkTo = order.email;
        var token = await bcrypt.hash(linkTo, 8);
        var id = 2;
        console.log(token);
          await this.sendActivationMail(
            linkTo,
            `http://localhost:3000/order/activate/${token}/${id}`
          );
        //this.SendOrder(order);
    }
    IsMatch(email,token){
        return bcrypt.compareSync(email, token);
    }
}

module.exports = new OrderController();