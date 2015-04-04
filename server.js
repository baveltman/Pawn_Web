
var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var bodyParser = require("body-parser"); // Body parser for fetch posted data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

//include routes
require('./routes')(app);

// sets port 3000 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 3000);


// //have the server listen locally at port
var server = app.listen(app.get('port'), function () {


});

//temporary index
app.get('/', function(req, res){
    res.send('welcome to dog park'); 
});


