const fetch = require("node-fetch");
const {nameRequest} = require("./name");
const {getMainKeyboard} = require("../mainKeyboard");
const confirmPhone = async (bot, msg, tg_phone) => {
    try{
        const client = (await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json())[0]
        const phone = tg_phone.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', '')
        if(client.phone === msg.chat.id.toString()){
            client.phone = null
        }
        if(client.phone){
            const old_phone = client.phone.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', '')
            if(old_phone !== phone){
                const reply_markup = {
                    inline_keyboard: [
                        [
                            {
                                text: old_phone,
                                callback_data: `phone:${old_phone}`
                            },
                            {
                                text: phone,
                                callback_data: `phone:${phone}`
                            }
                        ],

                    ],

                }
                await bot.sendMessage(msg.chat.id, `Выберите номер для связи`, {reply_markup: reply_markup});
            }
            else {
                await bot.sendMessage(msg.chat.id, `Благодарим за подтверждение`, {reply_markup: getMainKeyboard(msg.chat.id)});
            }
        }
        else {
            const response = await fetch(`https://localhost:7083/Client/${client.id}?phone=${phone}`,{
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            })
            if(response.status === 200){
                await nameRequest(bot, msg)

            }
        }
    }
    catch (error){
        console.log(error)
    }



}

module.exports = {confirmPhone}
