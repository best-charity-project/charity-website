const express = require('express'); // eslint-disable-line

const app = express();
const bodyParser = require('body-parser'); // eslint-disable-line
const router = require('./routes/newsRoutes'); // eslint-disable-line

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  next();
});

app.use('/api', router);

app.listen(port);
