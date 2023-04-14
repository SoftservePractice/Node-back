const fetch = require("node-fetch");
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
    console.log(works)
    // let keyboard = []
    // for (let i = 0; i < orders.length; i++) {
    //     if (orders[i].end) {
    //         keyboard.push([{
    //             text: orders[i].start,
    //             callback_data: `order:${orders[i].id}`
    //         }])
    //     }
    // }
    let worksText = '';
    for (let i = 0; i<works.length;i++){
        worksText += `'work name' цена ${works[i].detailPrice + works[i].workPrice}\n`
    }
    const text = `Заказ №${order.id}\n
    ${worksText}\n
    финальная цена: ${order.finalPrice} 
    `
    // const reply_markup = {
    //     inline_keyboard: keyboard,
    //
    // }
    await bot.sendMessage(callbackQuery.message.chat.id, text);
}


module.exports={orderList, order}
