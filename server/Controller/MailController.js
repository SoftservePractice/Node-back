const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
class MailController{
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
        console.log('sendActivationMail start');
        await this.transporter.sendMail({
            from: "avtoservis2234@gmail.com",
            to,
            subject: "Активация акаунта",
            text: "",
            html:
                `<div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
          </div>
          `
        });
        console.log('sendActivationMail end');
    }
    async initActivasion(client) {
        console.log(client.email);

        var salt = bcrypt.genSaltSync(16);
        var token = await bcrypt.hashSync(client.email, salt);
        console.log('Client id: ' + client.id);
        console.log('Client email: ' + client.email)
        console.log('Token: ' + token);
        await this.sendActivationMail(client.email, `http://localhost:3000/order/activate/${encodeURIComponent(token)}/${client.id}`);
        console.log('SendActivasion end');
    }
    IsMatch(email, token) {
        return bcrypt.compareSync(email, token);
    }
    async ConfirmEmail(req, res) {
        const token = req.params.token;
        const id = req.params.id;
        console.log(token);
        console.log(id);
        var client = await (await fetch(`${process.env.SERVER_URL}/Client/${id}`)).json()
        console.log(client);
        if (this.IsMatch(client.email, token)) {
            console.log('confirmed')
            try {
                await fetch(`${process.env.SERVER_URL}/Client/${client.id}?isConfirm=true`,{
                    method:"PATCH"
                })
            }
            catch {
                return res.status(400);
            }
            return res.status(200).send('Email confirmed.');
        }
        console.log('un confirmed')
        return res.status(400).send('Invalid email or token.');
    }
}

module.exports = new MailController