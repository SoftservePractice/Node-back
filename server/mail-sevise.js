import nodemailer from "nodemailer";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: "vova77557@gmail.com",
        pass: "fmpgyvjzndskbksd",
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: "vova77557@gmail.com",
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
export default new MailService();
