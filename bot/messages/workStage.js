const fetch = require("node-fetch");
const { getMainKeyboard } = require("../mainKeyboard");

const workStage = async (bot, msg) => {
    client = await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json()
    client = client[0]
    order = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    order = order[0];
    const workstage = await (await fetch(`${process.env.SERVER_URL}/Work?orderId=${order.id}`)).json();
    console.log(workstage);
    await bot.sendMessage(msg.chat.id, `Детали: ${workstage[0].detail}шт\n\nОплата за детали: ${workstage[0].detailPrice}грн\nОплата за работу: ${workstage[0].workPrice}грн\n\n   Всего к оплате:\n   ${parseInt(workstage[0].detailPrice)+parseInt(workstage[0].workPrice)}грн`, { reply_markup: getMainKeyboard(msg.chat.id) });
}

module.exports = { workStage }
