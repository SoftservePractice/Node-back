const fetch = require("node-fetch");
const {getCurrentHistoryOrders} = require("../methods/getCurrentHistoryOrders");
const PrettyTable = require("../methods/prettytable");

const workStage = async (bot, msg) => {
    const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
    const orders = await (await fetch(`${process.env.SERVER_URL}/Order?clientId=${client.id}`)).json()
    const {current_order, history_order} = getCurrentHistoryOrders(orders)
    const order = current_order[0]
    const pt = new PrettyTable();
    pt.fieldNames(["Робота", "Ціна"]);
    const works = await (await fetch(`${process.env.SERVER_URL}/Work?orderId=${order.id}`)).json()
    for (let i = 0; i<works.length;i++){
        pt.addRow([works[i].workListNavigation.name,works[i].detailPrice + works[i].workPrice]);
    }
    console.log(pt.toString())
    const text = '<pre>'+ pt.toString() +'</pre>'
    await bot.sendMessage(msg.chat.id, text, {parse_mode:'HTML'});
}

module.exports = { workStage }
