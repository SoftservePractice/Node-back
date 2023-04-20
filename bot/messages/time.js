const fetch = require("node-fetch");
const { registerNextStep } = require("../registerNextStep");
const { getMainKeyboard } = require("../mainKeyboard");
const {getCurrentHistoryOrders} = require("../methods/getCurrentHistoryOrders");

const saveTime = async (bot, msg) => {
    try {
        const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
        const response = await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}&appointmentTime=${msg.text}`, {
            method: 'POST'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваш час запису: ${msg.text} збережено`, { reply_markup: await getMainKeyboard(msg.chat.id) });
        }
        else {
            await bot.sendMessage(msg.chat.id, `Некоректно дані`, { reply_markup: await getMainKeyboard(msg.chat.id) });
            console.error(response)
        }
    } catch (e) {
        console.error(e)
    }
}
const changeTime = async (bot, msg) => {
    const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
    const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    const {current_order, history_order} = getCurrentHistoryOrders(orders)
    try {
        const response = await fetch(`${process.env.SERVER_URL}/Order/${current_order[0].id}?appointmentTime=${msg.text}&clientId=${client.id}`, {
            method: 'PATCH'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваш час запису: ${msg.text} збережено`, { reply_markup: await getMainKeyboard(msg.chat.id) });
            console.error(response)

        }
        else {
            await bot.sendMessage(msg.chat.id, `Некоректно дані`, { reply_markup: await getMainKeyboard(msg.chat.id) });
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}
const timeRequest = async (bot, msg, change=false) => {
    const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
    const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    const {current_order, history_order} = getCurrentHistoryOrders(orders)
    if(change){
        await bot.sendMessage(msg.chat.id, `Ввеіть бажану дату\nПриклад: 2023-12-09`)
        if (current_order.length === 0){
            await registerNextStep(msg.chat.id.toString(), saveTime)
        }
        else {
            await registerNextStep(msg.chat.id.toString(), changeTime)
        }
    }
    else if (current_order.length === 0){
        await bot.sendMessage(msg.chat.id, `Ввеіть бажану дату\nПриклад: 2023-12-09`)
        await registerNextStep(msg.chat.id.toString(), saveTime)
    }
    else {
        await bot.sendMessage(msg.chat.id, `Ви вже записалися`, { reply_markup: await getMainKeyboard(msg.chat.id) });
    }
}


module.exports = { timeRequest }
