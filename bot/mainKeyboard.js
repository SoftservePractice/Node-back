const fetch = require("node-fetch");
const getMainKeyboard = async (id) => {
    const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${id}`)).json())[0]
    const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    let current_order = false
    let history_order = false
    for (let i = 0; i < orders.length; i++) {
        if (!orders[i].end) {
            current_order = true
        } else {
            history_order = true
        }
    }
    let keyboard = []
    if (current_order) {
        keyboard.push(["Просмотреть запись"])
    } else {
        keyboard.push(["Хочу записаться"])
    }
    if (history_order) {
        keyboard.push(["История ремонтов"])
    }
    keyboard.push(["Связь с нами","Услуги"])
    return {
        "keyboard": keyboard,
        is_persistent: true,
        resize_keyboard: true
    }
}

module.exports = {getMainKeyboard}
