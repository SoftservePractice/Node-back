const {timeRequest} = require('../messages/time');


const timeHandler = async (bot, msg) => {
    await timeRequest(bot,msg)
};

module.exports = {timeHandler}
