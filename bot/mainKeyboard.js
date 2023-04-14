const getMainKeyboard = (id) => {
    return {
        "keyboard": [["Просмотреть запись","Связь с нами"]],
        is_persistent: true,
        resize_keyboard: true
    }
}

module.exports = {getMainKeyboard}
