const TelegramBot = require('node-telegram-bot-api');
const {startHandler} = require("./commands/start");
const {orderHandler} = require("./commands/order");
const {confirmPhone, phoneSelection} = require("./messages/phone");
const {getNextStepList, deleteNextStep} = require("./registerNextStep");
const {timeRequest} = require('./messages/time');
const {deleteOrder} = require('./messages/cancelorder');
const TOKEN = '6216836480:AAFR7OgmzqPqDLskIolKd5dAXTJbMn06pdQ';

const bot = new TelegramBot(TOKEN, {polling: true});

process.env.SERVER_URL = 'http://egorhi-001-site1.htempurl.com';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


bot.onText(/\/start/, async (msg) => {
    await startHandler(bot, msg)
})
bot.on('contact', async (msg) => {
    await confirmPhone(bot, msg, msg.contact.phone_number)
})
bot.on('callback_query', async (callbackQuery) => {
    const action = callbackQuery.data;
    if (action === 'phone') {
        await phoneSelection(bot, callbackQuery)
    }
    if (action === 'settime') {
        await timeRequest(bot, callbackQuery.message)
    }
    else if (action === 'deleteOrder') {
      await deleteOrder(bot, callbackQuery.message);
    }
});

bot.on('message', async (msg) => {
    const nextStepList = await getNextStepList()
    if (nextStepList.has(msg.chat.id.toString())) {
        nextStepList.get(msg.chat.id.toString())(bot, msg)
        await deleteNextStep(msg.chat.id.toString())
    }
    if(msg.text === 'Хочу записаться'){
        await timeRequest(bot,msg);
    }
    if(msg.text === 'Просмотреть запись'){
        await orderHandler(bot,msg);
    }
    if(msg.text === 'Вернуться'){
        await startHandler(bot, msg);
    }
})
