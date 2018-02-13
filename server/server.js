const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/newsRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;

app.use('/api', router);

app.listen(port);
