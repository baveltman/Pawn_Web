/**
* Model for User
*/

function User(req) {
	this.facebookId = req.body.facebookId;
	this.email = req.body.email;
	this.birthdate = req.body.birthdate;
	this.gender = req.body.gender;
	this.description = req.body.description;
}

User.prototype.isValid = function() {
	var isEmailValid = false;

	if (this.email && this.email.length > 0){
		isEmailValid = this.isEmailValid(this.email);
	}

	return (+this.facebookId > 0) && isEmailValid;
};

User.prototype.isEmailValid = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


module.exports = User;