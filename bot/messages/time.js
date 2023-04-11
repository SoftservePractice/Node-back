const fetch = require("node-fetch");
const { registerNextStep } = require("../registerNextStep");
const { getMainKeyboard } = require("../mainKeyboard");

const saveTime = async (bot, msg) => {

    const date = new Date(`${msg.text}`);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\./g, '-');

    try {
        client = await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json()
        client = client[0]
        console.log(client);
        const response = await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}&start=${formattedDate}`, {
            method: 'POST'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваше время записи: ${formattedDate} сохранено`, { reply_markup: getMainKeyboard(msg.chat.id) });
        }
        else {
            await bot.sendMessage(msg.chat.id, `Не верные данные`, { reply_markup: getMainKeyboard(msg.chat.id) });
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}
const changeTime = async (bot, msg) => {
    client = await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json()
    client = client[0]
    order = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    order = order[0];
    const date = new Date(`${msg.text}`);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\./g, '-');
    console.log(formattedDate);
    try {
        const response = await fetch(`${process.env.SERVER_URL}/Order/${order.id}?start=${formattedDate}`, {
            method: 'PATCH'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваше время записи: ${formattedDate} сохранено`, { reply_markup: getMainKeyboard(msg.chat.id) });
        }
        else {
            await bot.sendMessage(msg.chat.id, `Не верные данные`, { reply_markup: getMainKeyboard(msg.chat.id) });
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}
const timeRequest = async (bot, msg) => {
    await bot.sendMessage(msg.chat.id, `Введите время на которое вам удобно записаться\nПример времени: 2023-12-09`)
    client = await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json()
    client = client[0]
    order = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    if (order.length === 0) {
        await registerNextStep(msg.chat.id.toString(), saveTime)
    }
    else {
        await registerNextStep(msg.chat.id.toString(), changeTime)
    }
}


module.exports = { timeRequest }
