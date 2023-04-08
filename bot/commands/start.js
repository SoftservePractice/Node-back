const fetch = require('node-fetch');
const {nameRequest} = require("../messages/name");
const {sendPhone} = require("../messages/phone");
const {getMainKeyboard} = require("../mainKeyboard");



const startHandler = async (bot, msg) => {
    let client;
    if (msg.text.toString().includes(' ')) {
        const id = msg.text.toString().split(' ')[1]
        if((await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()).length === 0){
            const response = await fetch(`https://localhost:7083/Client/${id}?telegramId=${msg.chat.id}`, {
                method: 'PATCH',
            })
            if(response.status === 200){
                client = (await (await response.json())).client
            }
        }
    } else {
        client = await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()
        if(client.length>0){
            client = client[0]
        }
        else {
            await sendPhone(bot, msg, null)
        }
    }
    if(client.phone === null || client.isConfirm === false)
    {
        await sendPhone(bot, msg, client)
    }
    else if(client.name === null){
        await nameRequest(bot, msg)
    }
    else {
        await bot.sendMessage(msg.chat.id, `Здравствуйте, ${msg.chat.first_name}`, {reply_markup: getMainKeyboard(msg.chat.id)});
    }
}

module.exports = {startHandler}
