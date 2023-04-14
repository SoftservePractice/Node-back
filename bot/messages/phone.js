const fetch = require("node-fetch");
const {nameRequest} = require("./name");
const {getMainKeyboard} = require("../mainKeyboard");

const sendPhone = async (bot, msg, client) => {
    try {
        if (!client) {
            const response = await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
            if (response.status !== 201) {
                console.error(response)
            }
        }
        const reply_markup = {
            keyboard: [
                [
                    {
                        text: 'Отправить номер',
                        request_contact: true,

                    }
                ]
            ],
            is_persistent: true,
            resize_keyboard: true
        }
        await bot.sendMessage(msg.chat.id, `Подтвердите свой номер`, {reply_markup: reply_markup});
    } catch (e) {
        console.error(e)
    }

}

const confirmPhone = async (bot, msg, tg_phone) => {
    try {
        const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${msg.chat.id}`)).json())[0]
        const phone = tg_phone.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', '')
        if (client.phone !== null) {
            const old_phone = client.phone.replaceAll('+', '').replaceAll(' ', '').replaceAll('-', '')
            if (old_phone !== phone) {
                const reply_markup = {
                    inline_keyboard: [
                        [
                            {
                                text: old_phone,
                                callback_data: `phone:${old_phone}`
                            },
                            {
                                text: phone,
                                callback_data: `phone:${phone}`
                            }
                        ],

                    ],

                }
                await bot.sendMessage(msg.chat.id, `Выберите номер для связи`, {reply_markup: reply_markup});
            } else {
                const response = await fetch(`${process.env.SERVER_URL}/Client/${client.id}?isConfirm=true`, {
                    method: 'PATCH',
                })
                if (response.status === 200) {
                    if(client.name === null){
                        await nameRequest(bot, msg)
                    }
                    else {
                        await bot.sendMessage(msg.chat.id, `Благодарим за подтверждение`, {reply_markup: getMainKeyboard(msg.chat.id)});
                    }
                } else {
                    console.error(response)
                }

            }
        } else {
            const response = await fetch(`${process.env.SERVER_URL}/Client/${client.id}?phone=${phone}&isConfirm=true`, {
                method: 'PATCH',
            })
            if (response.status === 200) {
                if(client.name === null){
                    await nameRequest(bot, msg)
                }
                else {
                    await bot.sendMessage(msg.chat.id, `Благодарим за подтверждение`, {reply_markup: getMainKeyboard(msg.chat.id)});
                }
            } else {
                console.error(response)
            }
        }
    } catch (e) {
        console.error(e)
    }
}


const phoneSelection = async (bot, callbackQuery) => {
  try{
      const client = (await (await fetch(`${process.env.SERVER_URL}/Client?telegramId=${callbackQuery.message.chat.id}`)).json())[0]
      const phone = callbackQuery.data.split(':')[1]
      const response = await fetch(`${process.env.SERVER_URL}/Client/${client.id}?phone=${phone}&isConfirm=true`, {
          method: 'PATCH',
      })
      if (response.status === 200) {
          if(client.name === null || client.name === ''){
              await nameRequest(bot, callbackQuery.message)
          }
          else {
              await bot.sendMessage(callbackQuery.message.chat.id, `Благодарим за подтверждение`, {reply_markup: getMainKeyboard(callbackQuery.message.chat.id)});
          }

      } else {
          console.error(response)
      }
  }
  catch (e) {
      console.error(e)
  }
}

module.exports = {confirmPhone, sendPhone, phoneSelection}
