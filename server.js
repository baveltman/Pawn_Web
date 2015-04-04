
var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data

//import models
var User = require('./models/User.js');

var connection = mysql.createConnection({ // Mysql Connection
    host : 'localhost',
    user : 'root',
    password : 'barkbark69',
    database : 'dogpark',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

/**
* /users/ endpoints
*/

// GET /users/{facebookId}
// returns record of user with facebookId
app.get('/users/:facebookId', function(req, res) {
  
	//ensure id was properly passed
	if(!req.params.facebookId  || +req.params.facebookId < 0) {
		res.statusCode = 404;
		return res.send('Error 404: no user found');
	}  

	//get id from request
	var id = req.params.facebookId;
	
	//initialize return object
	var data = {
        "error":1,
        "user":""
    };
    
    if(!!id){
    	//query for return
        connection.query("SELECT * FROM users WHERE facebookId=?",[id],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["user"] = "Error getting user data";
            }else{
            	//return data successfully
                data["error"] = 0;
                data["user"] = rows[0];
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["user"] = "Please provide userid to retrieve data";
        res.json(data);
    }
});

// POST /users/
// creates new user
app.post('/users/', function(req, res) {

	var user = new User(req);
  
	//ensure id was properly passed
	if(!user.isValid()) {
		res.statusCode = 404;
		return res.send('Error 404: cannot create user. facebookId or email field is not valid');
	}  
	
	//initialize return object
	var data = {
        "error":1,
        "user":""
    };
    
    if(!!user){
    	//query for return
        connection.query("insert into users (facebookId,email,birthdate,gender,description,active) values (?,?,?, ?, ?, ?);",[user.facebookId, user.email, user.birthdate, user.gender, user.description, 1],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["errorMessage"] = err;
            }else{
            	//return data successfully
            	res.statusCode = 200;
                data["error"] = 0;
                data["user"] = user;
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["user"] = "Something went wrong creating this user";
        res.json(data);
    }
});

//have the server listen locally at port
var server = app.listen(3000, function () {


});