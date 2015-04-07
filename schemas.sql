CREATE TABLE users 
	(
		_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		id INT UNSIGNED NOT NULL,
		active INT UNSIGNED NOT NULL,
		first_name VARCHAR(200),
		email VARCHAR(500) NOT NULL,
		timezone INT,
		name VARCHAR (400),
		locale VARCHAR(10),
    	last_name VARCHAR(200),
		gender VARCHAR(6),
		description VARCHAR(1000),

		PRIMARY KEY(_id),
		UNIQUE (id),
		UNIQUE (email),

		INDEX userId_ind (id)

	);

CREATE TABLE places
	(
		_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		description VARCHAR (2000),
		PRIMARY KEY(_id)

	); 

CREATE TABLE placeHours
	(
		_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		placeId INT UNSIGNED NOT NULL,
		dayOfWeek INT UNSIGNED NOT NULL,
		openTime TIME NOT NULL,
		closeTime TIME NOT NULL,

		INDEX placeId_ind (placeId),

		FOREIGN KEY (placeId) 
        	REFERENCES places(_id),

		PRIMARY KEY(_id)

	); 

CREATE TABLE dogs
	(
		_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		userId INT UNSIGNED, 
		breed VARCHAR(100),
		description VARCHAR (2000),
		weightInLbs DECIMAL UNSIGNED,
		size INT UNSIGNED,
		gender BIT,
		picUrl VARCHAR(2000),

		INDEX userId_ind (userId),

		FOREIGN KEY (userId) 
        	REFERENCES users(id),

		PRIMARY KEY(_id)

	); 

CREATE TABLE checkins 
	(
		_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		userId INT UNSIGNED, 
		placeId INT UNSIGNED,
		lat DECIMAL NOT NULL,
		lng DECIMAL NOT NULL,
		datetime DATETIME NOT NULL,
		
		INDEX userId_ind (userId),
		INDEX placeId_ind (placeId),
		
		FOREIGN KEY (userId) 
        	REFERENCES users(id),
        FOREIGN KEY (placeId) 
        	REFERENCES places(_id),
        PRIMARY KEY(_id)
	);