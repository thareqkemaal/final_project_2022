const express = require('express');
const { userController } = require('../controllers');
const { readToken } = require('../config/encript');
const route = express.Router();

// route.get('/getaddress', userController.getaddress);
route.get('/',userController.getData);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/keeplogin',readToken,userController.keepLogin);
route.patch('/updateverif',readToken,userController.verification);
route.get('/resendverif',userController.resendVerif)

// USER ADDRESS
route.get('/getaddress', readToken, userController.getAddress);
route.post('/addaddress', readToken, userController.addAddress);
route.patch('/updateaddress', readToken, userController.updateAddress);
route.delete('/deleteaddress/:idaddress', userController.deleteAddress);


// RAJAONGKIR
route.get('/province', userController.getProvince);
route.get('/city', userController.getCity);
route.get('/delivery/:origin/:destination/:weight/:courier', userController.getDelivery)

module.exports=route