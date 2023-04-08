const TelegramBot = require('node-telegram-bot-api');
const {startHandler} = require("./commands/start");
const {confirmPhone, phoneSelection} = require("./messages/phone");
const {getNextStepList, deleteNextStep} = require("./registerNextStep");

const TOKEN = '6216836480:AAFR7OgmzqPqDLskIolKd5dAXTJbMn06pdQ';

const bot = new TelegramBot(TOKEN, {polling: true});


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


bot.onText(/\/start/, async (msg) => {
    await startHandler(bot, msg)
})

bot.on('contact', async (msg) => {
    await confirmPhone(bot, msg, msg.contact.phone_number)
})


bot.on('callback_query', async (callbackQuery) => {
    if (callbackQuery.data.includes('phone')) {
        await phoneSelection(bot, callbackQuery)
    }
});

bot.on('message', async (msg) => {
    const nextStepList = await getNextStepList()
    if (nextStepList.has(msg.chat.id.toString())) {
        nextStepList.get(msg.chat.id.toString())(bot, msg)
        await deleteNextStep(msg.chat.id.toString())
    }
})
