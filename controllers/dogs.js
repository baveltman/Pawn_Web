/**
* /dogs/ endpoints
*/

//import models
var Dog = require('../models/dog.js');

//get db connection
var db = require('../database.js');
var connection = db.getConnection();

// GET /dogs/{facebookId}
// returns record of user with facebookId
exports.findByUserId = function(req, res){
  //ensure id was properly passed
	if(!req.params.userId  || +req.params.userId < 0) {
		res.statusCode = 404;
		return res.send('Error 404: must supply proper userId');
	}  

	//get id from request
	var id = req.params.userId;
	
	//initialize return object
	var data = {
        "error":1,
        "dog":"",
        "message": ""
    };
    
    if(!!id){
    	//query for return
        connection.query("SELECT * FROM dogs WHERE userId=?",[id],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["message"] = "Error getting dog data";
            }else{
            	//return data successfully
                data["error"] = 0;
                data["dog"] = rows[0];
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["message"] = "Please provide userid to retrieve data";
        res.json(data);
    }
};


//POST /dog/
// creates new dog
exports.add = function(req, res){
	var dog = new Dog(req);
  
	//ensure id was properly passed
	if(!dog.isValid()) {
		res.statusCode = 404;
		return res.send('Error 404: cannot create dog. userId field is not valid');
	}  
	
	//initialize return object
	var data = {
        "error":1,
        "dog":"",
        "message": ""
    };
    
    if(!!dog){
    	//query for return
        connection.query("insert into dogs (userId,breed,description,weightInLbs,size,gender,picUrl) values (?,?,?,?,?,?,?);",[dog.userId, dog.breed, dog.description, dog.weightInLbs, dog.size, dog.gender, dog.picUrl],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["message"] = err;
            }else{
            	//return data successfully
            	res.statusCode = 200;
                data["error"] = 0;
                data["dog"] = dog;
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["message"] = "Something went wrong creating this dog";
        res.json(data);
    }
};

//PUT /dogs/
//updates dog with specified userId
exports.updateDog = function(req, res){
	var dog = new Dog(req);
  
	//ensure id was properly passed
	if(!dog.isValid()) {
		res.statusCode = 404;
		return res.send('Error 404: cannot update dog. userId field is not valid');
	}  
	
	//initialize return object
	var data = {
        "error":1,
        "dog":"",
        "message": ""
    };


    if(!!dog){
    	//query for return
        connection.query("update dogs set description = ?, picUrl = ? where userId = ?;",[dog.description, dog.picUrl, dog.userId],function(err, rows, fields){
            if(!!err){
            	//handle error
                data["message"] = err;
            }else{
            	//return data successfully
            	res.statusCode = 200;
                data["error"] = 0;
                data["dog"] = user;
            }
            res.json(data);
        });
    }else{
    	//handle error
        data["message"] = "Something went wrong updating this dog";
        res.json(data);
    }


};



