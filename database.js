var mysql = require('mysql'); // Mysql include

var currentConnection = null;

module.exports.getConnection = function(){
	if (!currentConnection){
		var connection = mysql.createConnection({ // Mysql Connection
		    host : 'localhost',
		    user : 'root',
		    password : 'barkbark69',
		    database : 'dogpark',
		});

		currentConnection = connection;
	}

	return currentConnection;

};
