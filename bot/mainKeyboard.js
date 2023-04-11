const getMainKeyboard = (id) => {
    return {
        "keyboard": [["Просмотреть запись"]],
        is_persistent: true,
        resize_keyboard: true
    }
}

module.exports = {getMainKeyboard}
