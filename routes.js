var express = require('express');
var router = express.Router();
 
var auth = require('./controllers/auth.js');
var users = require('./controllers/users.js');
 
/*
 * Routes that can be accessed by any one
 */

 //temporary index
router.get('/', function(req, res){
    res.send('welcome to pawn'); 
});

router.post('/login', auth.login);
router.post('/users', users.create);
 
/*
 * Routes that can be accessed only by autheticated users
 */
// router.get('/api/v1/products', products.getAll);
// router.get('/api/v1/product/:id', products.getOne);
// router.post('/api/v1/product/', products.create);
// router.put('/api/v1/product/:id', products.update);
// router.delete('/api/v1/product/:id', products.delete);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
// router.get('/api/v1/admin/users', user.getAll);
// router.get('/api/v1/admin/user/:id', user.getOne);
// router.post('/api/v1/admin/user/', user.create);
// router.put('/api/v1/admin/user/:id', user.update);
// router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router;