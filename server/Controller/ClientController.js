const fetch = require('node-fetch');
const MailController = require("./MailController")
class ClientController {
    
    async CreateUser(req, res, order) {
        console.log('Created user start')
        console.log(order)

        console.log('Fetch start')
        await fetch(`${process.env.SERVER_URL}/Client?name=${order.name}&phone=${order.phone}&email=${order.email}`, {
            method: 'POST',
        })
       
        var client = await (await fetch(`${process.env.SERVER_URL}/Client?name=${order.name}`)).json();
       
        if (client && client.length > 0) {
            client = client[0];
            console.log(client);
            await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}&appointmentTime=${order.datetime}`, {
                method: 'POST',
            })
            await MailController.initActivasion(client);
        } else {
            //
        }

    }
    
}

module.exports = new ClientController();