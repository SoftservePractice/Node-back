const fetch = require("node-fetch");
const {registerNextStep} = require("../registerNextStep");
const {getMainKeyboard} = require("../mainKeyboard");

const orderHandler = async (bot, msg) => {
    {
        const inlineKeyboard = {
          inline_keyboard: [
            [{ text: 'Установить время', callback_data: 'settime' }],
            [{ text: 'Отменить заказ', callback_data: 'delete_order' }],
          ]
        };
        await bot.sendMessage(msg.chat.id, 'Выберите действие:', { reply_markup: inlineKeyboard });
      }
};
module.exports = {orderHandler}
