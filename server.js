
var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data

var connection = mysql.createConnection({ // Mysql Connection
    host : 'localhost',
    user : 'root',
    password : 'barkbark69',
    database : 'dogpark',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data


// GET /users/{facebookId}
app.get('/quote/:facebookId', function(req, res) {
  
	//ensure id was properly passed
	if(!id || req.params.facebookId < 0) {
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
        connection.query("SELECT * FROM users WHERE facebookId=?",[Id],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["user"] = "Error getting user data";
            }else{
            	//return data successfully
                data["error"] = 0;
                data["user"] = rows;
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["user"] = "Please provide userid to retrieve data";
        res.json(data);
    }
});