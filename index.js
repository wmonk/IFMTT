var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.get('/', function (req, res) {
    res.send('Hey!');
});

app.listen(3000, function (err) {
    if (err) {
        throw err;
    }

    console.log('Listening on port 3000; http://localhost:3000');
});
