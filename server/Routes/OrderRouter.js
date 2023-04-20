const express = require("express");
const app = express();
const ClientController = require("../Controller/ClientController");
const MailController = require("../Controller/MailController")
app.post('/',async (req,res)=>{
    const order = req.body.order;
    await ClientController.CreateUser(req,res,order);
})
app.get('/activate/:token/:id',async (req,res)=>{
   await MailController.ConfirmEmail(req,res);
})

module.exports = app;
