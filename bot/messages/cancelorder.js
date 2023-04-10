const fetch = require("node-fetch");
const {registerNextStep} = require("../registerNextStep");
const {getMainKeyboard} = require("../mainKeyboard");

const deleteOrder = async (bot, msg) => {
    try { 
        
        order_id = msg.text;
            const response = await fetch(`https://localhost:7083/Order/${order_id}`, {
            method: 'DELETE'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваша запись удалена`);
        }
        else {
            await bot.sendMessage(msg.chat.id, `Не верные данные`);
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}

const requestIdOrder = async (bot, msg) => {
    client = await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()
    client = client[0]
    orders = await (await fetch(`https://localhost:7083/Order`)).json()
    const orderStrings = orders.map(order => `Запись №${order.id}\nЗапись на:${order.start}`);
    await bot.sendMessage(msg.chat.id, `${orderStrings}\nВыберите запись которую хотите удалить\nНапример 1`, {reply_markup: getMainKeyboard(msg.chat.id)})
    await registerNextStep(msg.chat.id.toString(), deleteOrder)
}


module.exports = {requestIdOrder}
