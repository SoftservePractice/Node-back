const express = require("express");
const app = express();
const ClientController = require("../Controller/ClientController");

app.post('/',async (req,res)=>{
    var order = req.body.order;
    console.log(order);
    await ClientController.CreateUser(req,res,order);
})
app.get('/activate/:token/:id',async (req,res)=>{
   await ClientController.ConfirmEmail(req,res);
})

module.exports = app;