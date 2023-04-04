const express = require("express");
const app = express();
const OrderController = require("../Controller/OrderController");
const { body , validationResult} = require('express-validator');

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
       OrderController.SendOrder(order);
    }
    
})


module.exports = app;