const express = require("express");
const OrderRouter = require('./Route/OrderRouter');
const app = express();

app.use(express.json());

app.use('/order',OrderRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});