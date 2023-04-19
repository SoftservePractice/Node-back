const fetch = require("node-fetch");
const {getCurrentHistoryOrders} = require("./methods/getCurrentHistoryOrders");
const getMainKeyboard = async (id) => {
    const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${id}`)).json())[0]
    const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    const {current_order, history_order} = getCurrentHistoryOrders(orders)
    let keyboard = []
    if (current_order.length>0) {
        keyboard.push(["Переглянути запис"])
    } else {
        keyboard.push(["Хочу записатися"])
    }
    if (history_order.length>0) {
        keyboard.push(["Історія ремонтів"])
    }
    keyboard.push(["Зв'язок з нами"])
    keyboard.push(["Послуги"])
    return {
        "keyboard": keyboard,
        is_persistent: true,
        resize_keyboard: true
    }
}

module.exports = {getMainKeyboard}
