const fetch = require("node-fetch");
const {getCurrentHistoryOrders} = require("../methods/getCurrentHistoryOrders");
const PrettyTable = require("../methods/prettytable");
const orderList = async (bot,msg) => {
    const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
    const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    let keyboard = []
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].end) {
            keyboard.push([{
                text: orders[i].start,
                callback_data: `order:${orders[i].id}`
            }])
        }
    }
    const reply_markup = {
        inline_keyboard: keyboard,

    }
    await bot.sendMessage(msg.chat.id, `Список ремонтов`, {reply_markup: reply_markup});
}

const order = async (bot,callbackQuery) => {
    const order = await (await fetch(`${process.env.SERVER_URL}/Order/${callbackQuery.data.split(':')[1]}`)).json()

    const works = await (await fetch(`${process.env.SERVER_URL}/Work?orderId=${order.id}`)).json()
    const pt = new PrettyTable();
    pt.fieldNames(["Робота", "Ціна"]);

    for (let i = 0; i<works.length;i++){
        pt.addRow([works[i].workListNavigation.name,works[i].detailPrice + works[i].workPrice]);
    }
    pt.addRow(['Фінальна ціна',order.finalPrice]);
    const text = `<pre>Заказ №${order.id}
${pt.toString()}</pre>`
    await bot.sendMessage(callbackQuery.message.chat.id, text, {parse_mode:'HTML'});
}

const orderHandler = async (bot, msg) => {
    {
        const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
        const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
        const {current_order, history_order} = getCurrentHistoryOrders(orders)
        if(current_order.length === 0){
            const inlineKeyboard = {
                inline_keyboard: [
                    [{ text: 'Записатись', callback_data: 'settime' }],
                ]
            };
            await bot.sendMessage(msg.chat.id, `Ви ще не маєте запису.\nСтворіть його`, { reply_markup: inlineKeyboard });

        }
        else{
            const order = current_order[0];
            const inlineKeyboard = {
                inline_keyboard: [
                    [{ text: 'Перенести', callback_data: 'settime' }],
                    [{ text: 'Скасувати запис', callback_data: 'deleteOrder' }],
                    [{ text: 'Статус роботи', callback_data: 'workStage' }],
                    [{ text: 'Повернутись', callback_data: 'return' }]
                ]
            };
            await bot.sendMessage(msg.chat.id, `Запис № ${order.id}\nЗапис на: ${order.appointmentTime}\nВиберіть дію: `, { reply_markup: inlineKeyboard });
        }
    }
};


module.exports={orderList, order, orderHandler}
