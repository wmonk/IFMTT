var express = require('express');
var bodyParser = require('body-parser')
require('dotenv').load();
var app = express();

app.use(express.static(__dirname + '/client/public'));
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

require('./routes')(app)

app.listen(3000, function (err) {
    if (err) {
        throw err;
    }

    console.log('Listening on port 3000; http://localhost:3000');
});
