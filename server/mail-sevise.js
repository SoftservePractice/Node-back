const nodemailer = require("nodemailer");

class MailService {
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
}
module.exports = new MailService();
