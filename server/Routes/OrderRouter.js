const express = require("express");
const app = express();
const OrderController = require("../Controller/OrderController");
const { body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
app.post('/',(req,res)=>{
    var order = req.body.order;
    console.log(order);
    body(order.name).notEmpty(),
    body(order.phone).isLength({min:12,max:12}),
    body(order.email).isEmail(),
    body(order.datetime).notEmpty(),
    body(order.confirmType).notEmpty(),
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       return res.body = OrderController.SendOrder(order);
    }
    
})
app.get('/activate:token:id',(req,res)=>{
    const token = req.params.token;
    const id = req.params.id;
    //выборка из почты по ид из бд
    const email='';
    const isMatch = bcrypt.compareSync(email, token);
    if (isMatch) {
      return res.status(200).send('Email confirmed.');
    } else {
      return res.status(400).send('Invalid email or token.');
    }
})

module.exports = app;