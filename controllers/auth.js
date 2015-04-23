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

//get date module
var moment = require('moment');
 
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

    connection.query("select * from users where email = ?;",[user.email],function(err, rows, fields){
        if(!!err){
          //handle error
          res.status(401);
          res.json({
            "status": 401,
            "message": "Invalid credentials"
          });
          return;
        }else{
          var returnedUser = rows[0];
          if (returnedUser){
             var hashedPassword = returnedUser.password;
             var passwordsMatch = bcrypt.compareSync(user.password, hashedPassword);
             if (passwordsMatch){
                res.status(200);
                var responseWithToken = auth.genToken(returnedUser);
                //save token to DB
                connection.query("insert into loginTokens (token, expirationDate, email) values (?,?,?);",[responseWithToken.token, responseWithToken.expires, user.email],function(err, rows, fields){
                    if(!!err){
                      res.json(responseWithToken);
                    } else {
                      res.json(responseWithToken);
                    }
                    
                }); 
                
             }
          } else {
            //no user found
            res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid credentials"
            });
            return;
          }    
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

  genToken: function(user) {
    var expires = moment().add(10, 'days').format("YYYY-MM-DD HH:MM:SS");
    var token = jwt.encode({
      exp: expires
    }, require('../config/secret')());

    user.password = "";

    //return succesful response
    return {
      token: token,
      expires: expires,
      user: user
    };
  },
}
   
module.exports = auth;