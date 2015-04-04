
var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var bodyParser = require("body-parser"); // Body parser for fetch posted data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

//include routes
require('./routes')(app);


// //have the server listen locally at port
var server = app.listen(3000, function () {


});


