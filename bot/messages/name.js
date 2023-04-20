const fetch = require("node-fetch");
const {registerNextStep} = require("../registerNextStep");
const {getMainKeyboard} = require("../mainKeyboard");

const saveName = async (bot, msg) => {
    try {
        const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
        const response = await fetch(`${process.env.SERVER_URL}/Client/${client.id}?name=${msg.text.toString()}`, {
            method: 'PATCH'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Дякуємо за підтвердження`);
        }
        else {
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}

const nameRequest = async (bot, msg) => {
    await registerNextStep(msg.chat.id.toString(), saveName)
    await bot.sendMessage(msg.chat.id, `Як до вас звертатись?`, {reply_markup: await getMainKeyboard(msg.chat.id)})
}

module.exports = {nameRequest}
