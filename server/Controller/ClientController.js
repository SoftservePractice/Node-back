const fetch = require('node-fetch');
const MailController = require("./MailController")

class ClientController {

    async CreateUser(req, res, order) {
        console.log('Created user start')
        // console.log(req)
        console.log(req.body.name)
        console.log(req.body.phone)
        console.log(req.body.email)
        let url = `${process.env.SERVER_URL}/Client?name=${req.body.name}`
        if (req.body.phone) {
            url += `&phone=${req.body.phone}`
        }
        if (req.body.email) {
            url += `&email=${req.body.email}`
        }
        console.log(url)
        console.log('Fetch start')
        let response = await fetch(url, {
            method: 'POST',
        })
        let client = await (await fetch(`${process.env.SERVER_URL}/Client?phone=${req.body.phone}`)).json();
        if (client && client.length > 0) {
            client = client[0];
            console.log(client);
            await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}&appointmentTime=${req.body.date}`, {
                method: 'POST',
            })
            if(req.body.email){
                await MailController.initActivasion(client);
            }
            return res.status(200).json({id:client.id})
        } else {
            //
        }

    }

}

module.exports = new ClientController();
