const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const OrderRouter = require("./Routes/OrderRouter")
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.SERVER_URL = 'http://egorhi-001-site1.htempurl.com';


app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());

app.use('/order',OrderRouter);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
