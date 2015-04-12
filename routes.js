module.exports = function(app, connection){
    
    var users = require('./controllers/users.js');
    app.get('/users/:facebookId', users.findById);
    app.post('/users', users.add);
    app.put('/users', users.updateUser);

    var dogs = require('./controllers/dogs.js');
    app.get('/dogs/:facebookId', dogs.findByUserId);
    app.post('/dogs', dogs.add);
    app.put('/dogs', dogs.updateDog);

}