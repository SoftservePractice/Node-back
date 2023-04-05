const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '6216836480:AAFR7OgmzqPqDLskIolKd5dAXTJbMn06pdQ';

const bot = new TelegramBot(TOKEN, {polling: true});

let next_step_list = []
let next_step_method_list = []


const acceptNumber = async (msg, phone) => {

    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: 'Yes',
                    callback_data: 'yes'
                },
                {
                    text: 'No',
                    callback_data: 'no'
                }
            ],

        ],

    }
    await bot.sendMessage(msg.chat.id, `Save ${phone} as you contact phone?`, {reply_markup: reply_markup});
}

bot.onText(/\/start/, async (msg) => {
    const name = msg.chat.first_name
    const reply_markup = {
        keyboard: [
            [
                {
                    text: 'Send phone',
                    request_contact: true
                }
            ]
        ],
    }
    await bot.sendMessage(msg.chat.id, `Hello, ${name}`, {reply_markup: reply_markup});
})

bot.on('contact', async (msg) => {
    acceptNumber(msg, msg.contact.phone_number)
})

const getPhone = async (msg) => {
    acceptNumber(msg, msg.text.toString())

}


bot.on('callback_query', async (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;

    if (action === 'yes') {
        const reply_markup = {
            "keyboard": [["test"]]
        }
        await bot.deleteMessage(msg.chat.id,msg.message_id )
        await bot.sendMessage(msg.chat.id, `Thanks`, {reply_markup: reply_markup});
    }
    if (action === 'no') {
        next_step_list.push(`${msg.chat.id}`)
        next_step_method_list.push({
            'id': msg.chat.id,
            'method': getPhone
        })
        bot.editMessageText('Send contact number please', {chat_id: msg.chat.id, message_id: msg.message_id});
    }
});

bot.on('message', async (msg) => {
    const next_step_position = next_step_list.indexOf(msg.chat.id.toString())
    if(next_step_position>=0){
        next_step_method_list[next_step_position].method(msg)
        next_step_list.splice(next_step_position, 1)
        next_step_method_list.splice(next_step_position, 1)
    }
})
