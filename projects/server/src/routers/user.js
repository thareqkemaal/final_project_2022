const express = require('express');
const { userController } = require('../controllers');
const { readToken } = require('../config/encript');
const route = express.Router();

route.get('/',userController.getData);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/keeplogin',readToken,userController.keepLogin);
route.patch('/updateverif',readToken,userController.verification);
route.get('/resendverif',userController.resendVerif);

module.exports=route