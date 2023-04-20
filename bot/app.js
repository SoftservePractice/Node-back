const TelegramBot = require('node-telegram-bot-api');
const {startHandler} = require("./commands/start");
const {confirmPhone, phoneSelection} = require("./messages/phone");
const {getNextStepList, deleteNextStep} = require("./registerNextStep");
const {timeRequest} = require('./messages/time');
const {deleteOrder} = require('./messages/cancelorder');
const {workStage} = require('./messages/workStage');
const {contacts} = require('./messages/contacts');
const {orderList, order, orderHandler} = require("./messages/order");
const {service} = require("./messages/service");
const TOKEN = '6216836480:AAFR7OgmzqPqDLskIolKd5dAXTJbMn06pdQ';

const bot = new TelegramBot(TOKEN, {polling: true});

process.env.SERVER_URL = 'http://egorhi-001-site1.htempurl.com';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


bot.onText(/\/start/, async (msg) => {
    await bot.sendChatAction(msg.chat.id, 'TYPING')
    await startHandler(bot, msg)
})
bot.on('contact', async (msg) => {
    await bot.sendChatAction(msg.chat.id, 'TYPING')
    await confirmPhone(bot, msg, msg.contact.phone_number)
})
bot.on('callback_query', async (callbackQuery) => {
    await bot.sendChatAction(callbackQuery.message.chat.id, 'TYPING')
    const action = callbackQuery.data;
    if (action.includes( 'phone')) {
        await phoneSelection(bot, callbackQuery)
    }
    if (action === 'settime') {
        await timeRequest(bot, callbackQuery.message, true)
    }
    if (action === 'deleteOrder') {
      await deleteOrder(bot, callbackQuery.message);
    }
    if(action === 'return'){
        await bot.deleteMessage(callbackQuery.message.chat.id, callbackQuery.message.message_id)
    }
    if(action === 'workStage'){
        await workStage(bot,callbackQuery.message)
    }
    if (action.includes( 'order')) {
        await order(bot, callbackQuery)
    }
});

bot.on('message', async (msg) => {
    await bot.sendChatAction(msg.chat.id, 'TYPING')
    const nextStepList = await getNextStepList()
    if (nextStepList.has(msg.chat.id.toString())) {
        nextStepList.get(msg.chat.id.toString())(bot, msg)
        await deleteNextStep(msg.chat.id.toString())
    }
    if(msg.text === 'Хочу записатися'){
        await timeRequest(bot,msg);
    }
    if(msg.text === 'Переглянути запис'){
        await orderHandler(bot,msg);
    }
    if(msg.text === 'Історія ремонтів'){
        await orderList(bot,msg);
    }
    if(msg.text === 'Зв\'язок з нами'){
        await contacts(bot,msg);
    }
    if(msg.text === 'Послуги'){
        await service(bot,msg);
    }
})
