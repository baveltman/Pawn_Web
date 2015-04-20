/**
* Model for User
*/

function User(req) {
    this.first_name = req.body.first_name;
    this.last_name = req.body.last_name;
    this.email = req.body.email;
    this.phone = req.body.phone;
    this.password = req.body.password;
}

User.prototype.isEmailValid = function() {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(this.email);
}


module.exports = User;