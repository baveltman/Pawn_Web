CREATE TABLE users 
	(
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		facebookId INT UNSIGNED, 
		email VARCHAR(200) NOT NULL,
		birthdate DATE,
		gender INT,
		description VARCHAR (1000),
		active BOOL NOT NULL,
		
		UNIQUE (email),
		PRIMARY KEY(id, facebookId)

	);

CREATE TABLE places
	(
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		description VARCHAR (2000),
		PRIMARY KEY(id)

	); 

CREATE TABLE placeHours
	(
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
		placeId INT UNSIGNED NOT NULL,
		dayOfWeek INT UNSIGNED NOT NULL,
		openTime TIME NOT NULL,
		closeTime TIME NOT NULL,

		INDEX placeId_ind (placeId),

		FOREIGN KEY (placeId) 
        	REFERENCES places(id),

		PRIMARY KEY(id)

	); 

CREATE TABLE dogs
	(
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
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

		PRIMARY KEY(id)

	); 

CREATE TABLE checkins 
	(
		id INT UNSIGNED NOT NULL AUTO_INCREMENT,
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
        	REFERENCES places(id),
        PRIMARY KEY(id)
	);