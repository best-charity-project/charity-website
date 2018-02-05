const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;

app.get('/', function (req, res) {
    res.send('hello world')
});

app.listen(port);
console.log('Listening on port ' + port);