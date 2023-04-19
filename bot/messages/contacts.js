const {getMainKeyboard} = require("../mainKeyboard");
const PrettyTable = require("../methods/prettytable");
const contacts = async (bot,msg)=>{
    const pt = new PrettyTable();
    pt.fieldNames(["Адреса", "Номер", "Пошта"]);
    pt.addRow(["Adress 1","+38-000-000-00-00", 'avtoservis2234@gmail.com']);
    pt.addRow(["Adress 2","+38-000-000-00-00", 'avtoservis2234@gmail.com']);
    pt.addRow(["Adress 3","+38-000-000-00-00", 'avtoservis2234@gmail.com']);
    pt.addRow(["Adress 4","+38-000-000-00-00", 'avtoservis2234@gmail.com']);
    const contactsString = '<pre>'+ pt.toString() +'</pre>';
    await bot.sendMessage(msg.chat.id, contactsString, {reply_markup: getMainKeyboard(msg.chat.id), parse_mode:'HTML'});
};


module.exports = {contacts};
