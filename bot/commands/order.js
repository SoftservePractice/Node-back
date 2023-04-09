const {timeRequest} = require('../messages/time');


const orderHandler = async (bot, msg) => {
    await timeRequest(bot,msg)
    
};

module.exports = {orderHandler}
