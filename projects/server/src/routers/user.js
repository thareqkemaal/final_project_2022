const express = require('express');
const { userController } = require('../controllers');
const { readToken } = require('../config/encript');
const route = express.Router();

route.get('/',userController.getData);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/keeplogin',readToken,userController.keepLogin);
route.patch('/updateverif',readToken,userController.verification);
route.get('/getaddress', userController.getAddress);
route.post('/addaddress', userController.addAddress);
route.patch('/updateaddress', userController.updateAddress);

// RAJAONGKIR
route.get('/province', userController.getProvince);
route.get('/city', userController.getCity);


module.exports=route