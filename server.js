var express = require('express');
var index = require('./routes/index.js');
var listRoute = require('./routes/list.js')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/grocery_items';
var MongoDB = mongoose.connect(mongoURI).connection;
var Item = require('./models/groceryItems.js');
var app = express();


MongoDB.on('error', function(err) {
    console.log('mongodb connection error: ', err);
});

MongoDB.once('open', function() {
    console.log('MongoDB connection open!');
});

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/', index);
app.use('/list', listRoute);





var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port', port);
});
