CREATE TABLE users 
	(
		_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		first_name VARCHAR(100),
		last_name VARCHAR(100),
		email VARCHAR(100) NOT NULL,
		phone VARCHAR(20),
		password VARCHAR(200) NOT NULL,

		PRIMARY KEY(_id),
		UNIQUE (email)

	);
