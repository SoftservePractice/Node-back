const fetch = require("node-fetch");
const {registerNextStep} = require("../registerNextStep");
const {getMainKeyboard} = require("../mainKeyboard");

const saveTime = async (bot, msg) => {
    const date = new Date(`${msg.text.split(" ")[0]}T0${msg.text.split(" ")[1]}`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    console.log(formattedDate);
    try { 
            const response = await fetch(`https://localhost:7083/Order/2?clientid=2?start=${formattedDate}`, {
            method: 'PATCH'
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
    const reply_markup = {
        keyboard: [
            [
                {
                    text: 'Отправить номер',
                    request_contact: true,

                }
            ]
        ],
        is_persistent: true,
        resize_keyboard: true
    }
    await bot.sendMessage(msg.chat.id, `Введите время на которое вам удобно записаться\nПример времени:2023-12-09 9:00`, {reply_markup: reply_markup})
    await registerNextStep(msg.chat.id.toString(), saveTime)
  }

module.exports = {timeRequest}
