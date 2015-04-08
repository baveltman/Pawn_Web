/**
* Model for User
*/

function User(req) {
	this.id = req.body.id;
	this.active = req.body.active;
    this.first_name = req.body.first_name;
    this.email = req.body.email;
    this.timezone = req.body.timezone;
    this.name = req.body.name;
    this.locale = req.body.locale;
    this.last_name = req.body.last_name;
    this.gender = req.body.gender;
    this.description = req.body.description;
}

User.prototype.isValid = function() {
	var isEmailValid = false;

	if (this.email && this.email.length > 0){
		isEmailValid = this.isEmailValid(this.email);
	}

	return (+this.id > 0) && isEmailValid;
};

User.prototype.isEmailValid = function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}


module.exports = User;