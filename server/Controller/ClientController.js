const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');
const { response } = require("../Routes/OrderRouter");
class ClientController {
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
  async CreateUser(req, res, order) {
    console.log('Created user start')
    console.log(order)
    try {
    console.log('Fetch start')
      await fetch(`http://egorhi-001-site1.htempurl.com/Client?name=${order.name}&phone=${order.phone}&email=${order.email}`,{
        method: 'POST',
      }).then(response => response.json())
        .then(response=>client=response.body);
        initActivasion(client)
      
    }
    catch {
      return res.status(400);
    }

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
    console.log(client);
    var token = await bcrypt.hash(client.email, 8);
    console.log('Client id: ' + client.id);
    console.log('Client email: ' + client.email)
    console.log('Token: ' + token);
    await this.sendActivationMail(client.email, `http://localhost:3000/order/activate/${token}/${client.id}`);
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
    client = await (await fetch(`http://egorhi-001-site1.htempurl.com/Client/${id}`)).json()
    client = client[0]
    if (IsMatch(client.email, token)) {
      console.log('confirmed')
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: client.id,
          isConfirm: true,
        })
      };
      try {
        await fetch(`https://localhost:7083/Client`, requestOptions)
          .then(response => response.json())
          .then(res => client = res.body);
        initActivasion(order)
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

module.exports = new ClientController();