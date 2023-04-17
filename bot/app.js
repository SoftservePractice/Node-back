const TelegramBot = require('node-telegram-bot-api');
const {startHandler} = require("./commands/start");
const {orderHandler} = require("./commands/order");
const {confirmPhone, phoneSelection} = require("./messages/phone");
const {getNextStepList, deleteNextStep} = require("./registerNextStep");
const {timeRequest} = require('./messages/time');
const {deleteOrder} = require('./messages/cancelorder');
const {workStage} = require('./messages/workStage');
const {contacts} = require('./messages/contacts');
const {orderList, order} = require("./messages/order");
const {workList} = require("./messages/workList");
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
    if (action.includes( 'phone')) {
        await phoneSelection(bot, callbackQuery)
    }
    else if (action === 'settime') {
        await timeRequest(bot, callbackQuery.message)
    }
    else if (action === 'deleteOrder') {
      await deleteOrder(bot, callbackQuery.message);
    }
    else if(action === 'return'){
        await startHandler(bot, callbackQuery.message);
    }
    else if(action === 'workStage'){
        await workStage(bot,callbackQuery.message)
    }
    else if (action === 'order') {
        await order(bot, callbackQuery.message)
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
    if(msg.text === 'История ремонтов'){
        await orderList(bot,msg);
    }
    if(msg.text === 'Связь с нами'){
        await contacts(bot,msg);
    }
    if(msg.text === 'Услуги'){
        await workList(bot,msg);
    }
})
