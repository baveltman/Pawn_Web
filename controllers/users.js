/**
* /users/ endpoints
*/

//import models
var User = require('../models/User.js');

//get db connection
var db = require('../database.js');
var connection = db.getConnection();

// GET /users/{facebookId}
// returns record of user with facebookId
exports.findById = function(req, res){
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
        "user":"",
        "message": ""
    };
    
    if(!!id){
    	//query for return
        connection.query("SELECT * FROM users WHERE id=?",[id],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["message"] = "Error getting user data";
            }else{
            	//return data successfully
                data["error"] = 0;
                data["user"] = rows[0];
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["message"] = "Please provide userid to retrieve data";
        res.json(data);
    }
};


//POST /users/
// creates new user
exports.add = function(req, res){
	var user = new User(req);
  
	//ensure id was properly passed
	if(!user.isValid()) {
		res.statusCode = 404;
		return res.send('Error 404: cannot create user. facebookId or email field is not valid');
	}  
	
	//initialize return object
	var data = {
        "error":1,
        "user":"",
        "message": ""
    };
    
    if(!!user){
    	//query for return
        connection.query("insert into users (id,active,first_name,email,timezone,name, locale, last_name, gender, description) values (?,?,?,?,?,?,?,?,?,?);",[user.id, 1, user.first_name, user.email, user.timezone, user.name, user.locale, user.last_name, user.gender, user.description],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["message"] = err;
            }else{
            	//return data successfully
            	res.statusCode = 200;
                data["error"] = 0;
                user.active = 1;
                data["user"] = user;
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["message"] = "Something went wrong creating this user";
        res.json(data);
    }
};

//PUT /users/
//updates user with specified Id
exports.updateUser = function(req, res){
	var user = new User(req);
  
	//ensure id was properly passed
	if(!user.isValid()) {
		res.statusCode = 404;
		return res.send('Error 404: cannot update user. facebookId or email field is not valid');
	}  
	
	//initialize return object
	var data = {
        "error":1,
        "user":"",
        "message": ""
    };


    if(!!user){
    	//query for return
        connection.query("update users set first_name = ?, email = ?, timezone = ?, name = ?, locale = ?, last_name = ?, gender = ?, description = ? where id = ?;",[user.first_name, user.email, user.timezone, user.name, user.locale, user.last_name, user.gender, user.description, user.id],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["message"] = err;
            }else{
            	//return data successfully
            	res.statusCode = 200;
                data["error"] = 0;
                user.active = 1;
                data["user"] = user;
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["message"] = "Something went wrong updating this user";
        res.json(data);
    }


};



