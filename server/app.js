const express = require("express");
const mailService = require("./mail-sevise");
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const server = async () => {
 const linkTo= "orlovsky.top@gmail.com";
  const activationLink = await bcrypt.hash(linkTo, 8);
  console.log(activationLink);
  await mailService.sendActivationMail(
    linkTo,
    `http://localhost:5001/order/activate/${activationLink}`
  );
};



app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

server();