const fetch = require("node-fetch");
const { getMainKeyboard } = require("../mainKeyboard");
const deleteOrder = async (bot, msg) => {
    try { 
        client = await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json()
        client = client[0]
        order = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
        order = order[0];
            const response = await fetch(`${process.env.SERVER_URL}/Order/${order.id}`, {
            method: 'DELETE'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваша запись удалена`,{reply_markup: getMainKeyboard(msg.chat.id)});
        }
        else {
            await bot.sendMessage(msg.chat.id, `Не верные данные`,{reply_markup: getMainKeyboard(msg.chat.id)});
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = {deleteOrder}
