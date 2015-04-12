/**
* Model for dog
*/

function Dog(req) {
	this.userId = req.body.userId;
    this.breed = req.body.breed; 
    this.description = req.body.description;
    this.weightInLbs = req.body.weightInLbs;
    this.size = req.body.size; 
    this.gender = req.body.gender; 
    this.picUrl = req.body.picUrl;
}

Dog.prototype.isValid = function() {
	return (+this.userId > 0);
};


module.exports = Dog;