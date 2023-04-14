const {getMainKeyboard} = require("../mainKeyboard");
const contacts = async (bot,msg)=>{
    const contacts = [
        {adress:"Adress 1",phone:"+38-000-000-00-00"},
        {adress:"Adress 2",phone:"+38-000-000-00-00"},
        {adress:"Adress 3",phone:"+38-000-000-00-00"},
        {adress:"Adress 4",phone:"+38-000-000-00-00"},
        {adress:"Adress 5",phone:"+38-000-000-00-00"}
    ];
    const contactsString = contacts.map(contact => `Адресс ${contact.adress}: ${contact.phone}`).join('\n');
    await bot.sendMessage(msg.chat.id, `Наши контакты:\n${contactsString}\n\nПочта: avtoservis2234@gmail.com`, {reply_markup: getMainKeyboard(msg.chat.id)});
};


module.exports = {contacts};