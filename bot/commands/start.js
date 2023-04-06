const fetch = require('node-fetch');
const {nameRequest} = require("../messages/name");

const sendPhone = async (bot, msg, client) =>{
    if(!client){
        const response = await fetch(`https://localhost:7083/Client?name=${msg.chat.id}&phone=${msg.chat.id}&telegramId=${msg.chat.id}`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }})
    }
    const reply_markup = {
        keyboard: [
            [
                {
                    text: 'Отправить номер',
                    request_contact: true,

                }
            ]
        ],
        is_persistent: true,
        resize_keyboard: true
    }
    await bot.sendMessage(msg.chat.id, `Подтвердите свой номер`, {reply_markup: reply_markup});
}

const startHandler = async (bot, msg) => {
    if (msg.text.toString().includes(' ')) {
        const id = msg.text.toString().split(' ')[1]
        console.log(id)
    } else {
        const client = await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()
        // console.log(client)
        if(client.length>0){
            if(client[0].phone === null || client[0].phone === msg.chat.id.toString())
            {
                await sendPhone(bot, msg, client)
            }
            else if(client[0].name === null || client[0].name === msg.chat.id.toString()){
                await nameRequest(bot, msg)
            }
            else {
                const reply_markup = {
                    keyboard: [
                        [
                            {
                                text: 'test',
                                request_contact: true
                            }
                        ]
                    ],
                }
                await bot.sendMessage(msg.chat.id, `Здравствуйте, ${msg.chat.first_name}`, {reply_markup: reply_markup});
            }
        }
        else {
            await sendPhone(bot, msg, null)
        }
    }
}

module.exports = {startHandler}
