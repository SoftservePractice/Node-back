const {getMainKeyboard} = require("../mainKeyboard");
const PrettyTable = require("../methods/prettytable");
const service = async (bot,msg)=>{
    const pt = new PrettyTable();
    pt.fieldNames(["Послуга", "Ціна"]);
    pt.addRow(["Послуга","100грн"]);
    pt.addRow(["Послуга","200грн"]);
    pt.addRow(["Послуга","300грн"]);
    pt.addRow(["Послуга","400грн"]);
    const contactsString = '<pre>'+ pt.toString() +'</pre>';
    await bot.sendMessage(msg.chat.id, contactsString, {reply_markup: await getMainKeyboard(msg.chat.id), parse_mode:'HTML'});
};


module.exports = {service};
