const fetch = require("node-fetch");
const {registerNextStep} = require("../registerNextStep");
const {getMainKeyboard} = require("../mainKeyboard");

const saveTime = async (bot, msg, client) => {
    
    const date = new Date(`${msg.text.split(" ")[0]}T0${msg.text.split(" ")[1]}`);
    const formattedDate = date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }).replace(',', '');
    console.log(formattedDate);
    try { 
        client = await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()
        client = client[0]
        console.log(client);
            const response = await fetch(`https://localhost:7083/Order/clientid=${client.id}?start=${formattedDate}`, {
            method: 'POST'
        })
        if (response.status === 200) {
            await bot.sendMessage(msg.chat.id, `Ваше время записи: ${formattedDate} сохранено`);
        }
        else {
            await bot.sendMessage(msg.chat.id, `Не верные данные`);
            console.error(response)
        }
    } catch (e) {
        console.log(e)
    }
}

const timeRequest = async (bot, msg) => {
    
    await bot.sendMessage(msg.chat.id, `Введите время на которое вам удобно записаться\nПример времени:2023-12-09 9:00`, {reply_markup: getMainKeyboard(msg.chat.id)})
    await registerNextStep(msg.chat.id.toString(), saveTime)
  }


module.exports = {timeRequest}
