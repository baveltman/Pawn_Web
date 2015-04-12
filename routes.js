module.exports = function(app, connection){
    
    var users = require('./controllers/users.js');
    app.get('/users/:facebookId', users.findById);
    app.post('/users', users.add);
    app.put('/users', users.updateUser);

}