const fetch = require("node-fetch");

const orderHandler = async (bot, msg) => {
    {
      client = await (await fetch(`https://localhost:7083/Client?telegramId=${msg.chat.id}`)).json()
      client = client[0]
        order = await (await fetch(`https://localhost:7083/Order?clientId=${client.id}`)).json()
        if(order.length === 0){
          const inlineKeyboard = {
            inline_keyboard: [
              [{ text: 'Записаться', callback_data: 'settime' }],
            ]
          };
          await bot.sendMessage(msg.chat.id, `У вас ещё нет записей.\nСоздайте её`, { reply_markup: inlineKeyboard });

        }
        else{
          order = order[0];
          const inlineKeyboard = {
            inline_keyboard: [
              [{ text: 'Перенести', callback_data: 'settime' }],
              [{ text: 'Отменить запись', callback_data: 'deleteOrder' }],
              [{ text: 'Вернуться', callback_data: 'return' }]
            ]
          };
          await bot.sendMessage(msg.chat.id, `Запись №${order.id}\nЗапись на:${order.start}\nВыберите действие: `, { reply_markup: inlineKeyboard });
        }
      }
};
module.exports = {orderHandler}
