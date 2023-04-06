const express = require("express");
const app = express();
const OrderController = require("../Controller/OrderController");

app.post('/',async (req,res)=>{
    var order = req.body.order;
    console.log(order);
    await OrderController.SendOrder(order);
    await OrderController.SendActivasion(order);
    return res.status(200).json({ success: true, message: 'Order sent successfully.' });
})
app.get('/activate/:token/:id',(req,res)=>{
    const token = req.params.token;
    const id = req.params.id;
    console.log(token);
    console.log(id);
    //выборка почты по ид из бд
    const email='phantomit228@gmail.com';
    if (OrderController.IsMatch(email,token)) {
      console.log('confirmed')
      return res.status(200).send('Email confirmed.');
    }
    console.log('un confirmed')
    return res.status(400).send('Invalid email or token.');
})

module.exports = app;