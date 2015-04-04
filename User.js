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


module.exports = User;