import express from "express";
import mailService from "./mail-sevise.js";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const server = async () => {
  const activationLink = uuidv4();
  console.log(activationLink);
  await mailService.sendActivationMail(
    "orlovsky.top@gmail.com",
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