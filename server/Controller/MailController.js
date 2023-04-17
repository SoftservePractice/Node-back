const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');

class MailController {
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
  async GenerateActivationLink(to){
    var salt = bcrypt.genSaltSync(16);
    var token = await bcrypt.hashSync(to, salt);
    console.log('Token: ' + token);
    var link = `http://localhost:3000/order/activate/${encodeURIComponent(token)}`;
    console.log('Link: ' + link);
    return link;
  }
  async sendActivationMail(to,link) {
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
  async sendRecordMail(to,time, adress,phone,email ) {
    await this.transporter.sendMail({
      from: "avtoservis2234@gmail.com",
      to,
      subject: "Заявка на автосервіс",
      text:"",
      html:
      `<div style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: black;">
      <h1 style="padding-top: 30px; text-align: center; font-size: 32px; font-weight: 900;">Сar-service</h1>
      <p style="text-align: center; font-weight: 900; font-size: 38px; padding:40px; background-color: rgb(53, 121, 174);">Вашу заявку успішно створено</p>
      <div style="padding-left: 20px;">
      <span style="font-size: 25px; font-weight: 900;">Дані щодо запису:</span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Дата: <span style="font-weight: 900;">${time}</span></span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Адреса: <span style="font-weight: 900;">${adress}</span></span>
      <span style="display: block; font-weight: 900; font-size: 32px;padding-bottom: 10px;">Залишилися питання щодо запису?</span>
      <span style="font-size: 25px; font-weight: 900;">Контактні дані:</span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Телефон: <span style="font-weight: 900;">${phone}<span></span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Email: <span style="font-weight: 900;">${email}<span></span>
       </div>
      <h3 style="font-size: 32px; font-weight: 900; text-align: center;">Дякуемо за вашу заявку!</h3>
      </div>
      `
    });
  }
  
  async sendRemindersMail(to,time, adress,phone,email ){
    await this.transporter.sendMail({
      from: "avtoservis2234@gmail.com",
      to,
      subject: "Нагадування про заявку на автосервіс",
      text:"",
      html:
      `<div style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: black;">
      <h1 style="padding-top: 30px; text-align: center; font-size: 32px; font-weight: 900;">Сar-service</h1>
      <p style="text-align: center; font-weight: 900; font-size: 38px; padding:40px; background-color: rgb(53, 121, 174);">Нагадування про запис в автосервіс</p>
      <div style="padding-left: 20px;">
      <span style="font-size: 25px; font-weight: 900;">Дані щодо запису:</span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Дата: <span style="font-weight: 900;">${time}</span></span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Адреса: <span style="font-weight: 900;">${adress}</span></span>
      <span style="display: block; font-weight: 900; font-size: 32px;padding-bottom: 10px;">Залишилися питання щодо запису?</span>
      <span style="font-size: 25px; font-weight: 900;">Контактні дані:</span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Телефон: <span style="font-weight: 900;">${phone}<span></span>
      <span style="display: block; font-size: 18px; margin: 5px 0;">Email: <span style="font-weight: 900;">${email}<span></span>
       </div>
      <h3 style="font-size: 32px; font-weight: 900; text-align: center;">Дякуемо що ви з нами!</h3>
      </div>
      `
    });
  }
  async sendReportMail(to,arr ){
    let totalPrice =0;
    await this.transporter.sendMail({
      from: "avtoservis2234@gmail.com",
      to,
      subject: "Нагадування про заявку на автосервіс",
      text:"",
      html:
      ` 
      <div style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color: black;">
    <h1 style="padding-top: 30px; text-align: center; font-size: 32px; font-weight: 900;">Сar-service</h1>
    <p style="text-align: center; font-weight: 900; font-size: 38px; padding:40px; background-color: rgb(53, 121, 174);">Звіт про виконані роботи</p>
    <div style="padding-left: 20px;">
        <table style="border: 1px solid black;border-collapse: collapse; width: 75%; margin: 0 auto;">
            <tr>
              <th style="border: 1px solid black;">Назва</th>
              <th style="border: 1px solid black;">Ціна деталей</th>
              <th style="border: 1px solid black;">ціна роботи</th>
            </tr>
            ${ arr.map( item => {
               totalPrice += item.priceDetail + item.priceRepair;
              return`
                <tr>
                <td style="border: 1px solid black; padding-left: 10px; font-weight: 900; font-size: 18px;">${item.name}</td>
                <td style="border: 1px solid black; padding-left: 10px; font-weight: 900; font-size: 18px;">uan:${item.priceDetail}</td>
                <td style="border: 1px solid black; padding-left: 10px; font-weight: 900; font-size: 18px;">uan:${item.priceRepair}</td>
            </tr>`
            }
            ).join('')
            }
            <tr>
                <td style="border: 1px solid black;font-weight:700;padding: 5px 0 5px 10px; font-size: 19px;" >Oканчательная цена: <span  style=" font-size: 20px;font-weight: 900; padding-left: 5px;">${totalPrice}</span> </td>
            </tr>
        </table>
        <div style="padding-top: 10px;">
               <span style="font-size: 25px; font-weight: 900; margin-top: 10px;">Контактні дані:</span>
               <span style="display: block; font-size: 18px; margin: 5px 0;">Телефон: <span style="font-weight: 900;">+38000000000<span></span>
               <span style="display: block; font-size: 18px; margin: 5px 0;">Email: <span style="font-weight: 900;">urkdeee@gmail.com<span></span>
        </div>
    </div>

    <h3 style="font-size: 32px; font-weight: 900; text-align: center;">Дякуемо що ви з нами!</h3>
</div>
      `
    });
  }
}
module.exports = new MailController();
