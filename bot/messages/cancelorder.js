const fetch = require("node-fetch");
const { getMainKeyboard } = require("../mainKeyboard");
const {getCurrentHistoryOrders} = require("../methods/getCurrentHistoryOrders");
const deleteOrder = async (bot, msg) => {
    try {
        const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
        const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
        const {current_order, history_order} = getCurrentHistoryOrders(orders)
        const response = await fetch(`${process.env.SERVER_URL}/Order/${current_order[0].id}`, {
            method: 'DELETE'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваш запис видалено`,{reply_markup: await getMainKeyboard(msg.chat.id)});
        }
        else {
            await bot.sendMessage(msg.chat.id, `Некоректно дані`,{reply_markup: await getMainKeyboard(msg.chat.id)});
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = {deleteOrder}
