const express = require("express");
const mailService = require("./mail-sevise");
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const server = async () => {
 const linkTo= "orlovsky.top@gmail.com";
  const activationLink = await bcrypt.hash(linkTo, 8);
  // console.log(activationLink);
  // await mailService.sendActivationMail(
  //   linkTo,
  //   `http://localhost:5001/order/activate/${activationLink}`
  // );

//  await mailService.sendRecordMail(linkTo, "18:30 12.04.2023",'Днепр кукурузина 1',"+38000000000000","carservice22945@gmail.com")
//  await mailService.sendRemindersMail(linkTo, "18:30 12.04.2023",'Днепр кукурузина 1',"+38000000000000","carservice22945@gmail.com");
 await mailService.sendReportMail(linkTo, [
  {name: "мотор жыгулей", priceDetail: 100, priceRepair:200},
  {name: "коробка жыгулей", priceDetail: 201, priceRepair:99}
]);

};



app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

server();