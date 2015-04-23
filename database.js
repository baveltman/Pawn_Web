var mysql = require('mysql'); // Mysql include

var currentConnection = null;

module.exports.getConnection = function(){
	if (!currentConnection || currentConnection.state == "disconnected"){
		var connection = mysql.createConnection({ // Mysql Connection
		    host : process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
		    user : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
		    port : process.env.OPENSHIFT_MYSQL_DB_PORT || '3306',
		    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'barkbark69',
		    database : 'dogpark',
		});

		currentConnection = connection;
	}

	return currentConnection;

};
