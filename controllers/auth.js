/**
* auth endpoint
*/

//import models
var User = require('../models/User.js');

//get db connection
var db = require('../database.js');
var connection = db.getConnection();

//get encryption module
var bcrypt = require('bcrypt-nodejs');

//get token module
var jwt = require('jwt-simple');
 
var auth = {
 
  login: function(req, res) {
    var user = new User(req);
 
    if(!user.isEmailValid()) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid email"
      });
      return;
    }

    if (!user.isPasswordValid()){
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid password"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(user.email, user.password);
   
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    if (dbUserObj) {
 
      // If authentication is success, we will generate a token
      // and dispatch it to the client
      res.status(200);
      res.json(genToken(dbUserObj));
    }
 
  },
 
  validate: function(email, password) {
      connection.query("select * from users where email = ?;",[email],function(err, rows, fields){
            if(!!err){
              //handle error
              return null;
            }else{
              var returnedUser = rows[0];
              if (returnedUser){
                 var hashedPassword = returnedUser.password;
                 var passwordsMatch = bcrypt.compareSync(password, hashedPassword);
                 if (passwordsMatch){
                    return returnedUser;
                 }
              }
              return null;
            }
        });
  },
 
  validateUser: function(email) {
    connection.query("select * from users where email = ?;",[email],function(err, rows, fields){
            if(!!err){
              //handle error
              return null;
            }else{
              return rows[0];
            }
        });
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  //save token to DB
  connection.query("insert into loginTokens (token, expirationDate) values (?,?);",[token, expires],function(err, rows, fields){ });
 
  user.password = "";

  //return succesful response
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;