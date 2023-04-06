const express = require("express");
const OrderRouter = require("./Routes/OrderRouter")
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}


app.use(express.json());
app.use(cors(corsOptions));

app.use('/order',OrderRouter);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
