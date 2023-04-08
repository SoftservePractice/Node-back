const fetch = require('node-fetch');
const {nameRequest} = require("../messages/name");
const {sendPhone} = require("../messages/phone");
const {getMainKeyboard} = require("../mainKeyboard");



const startHandler = async (bot, msg) => {
    if (msg.text.toString().includes(' ')) {
        const id = msg.text.toString().split(' ')[1]
        console.log(id)
    } else {
        const client = await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()
        if(client.length>0){
            if(client[0].phone === null || client[0].isConfirm === false)
            {
                await sendPhone(bot, msg, client[0])
            }
            else if(client[0].name === null){
                await nameRequest(bot, msg)
            }
            else {
                await bot.sendMessage(msg.chat.id, `Здравствуйте, ${msg.chat.first_name}`, {reply_markup: getMainKeyboard(msg.chat.id)});
            }
        }
        else {
            await sendPhone(bot, msg, null)
        }
    }
}

module.exports = {startHandler}
