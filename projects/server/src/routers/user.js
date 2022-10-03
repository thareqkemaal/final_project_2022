const express = require('express');
const { userController } = require('../controllers');
const { readToken } = require('../config/encript');
const { uploader } = require('../config/upload');
const route = express.Router();

const prescriptionUploader = uploader('/prescription', 'userprescription').array('prescription_pic', 1);

route.get('/',userController.getData);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/keeplogin',readToken,userController.keepLogin);
route.patch('/updateverif',readToken,userController.verification);
route.get('/resendverif',userController.resendVerif)

// RAJAONGKIR
route.get('/province', userController.getProvince);
route.get('/city', userController.getCity);
route.get('/delivery/:origin/:destination/:weight/:courier', userController.getDelivery);

// PRESCRIPTION
route.post('/addprescription', prescriptionUploader, readToken, userController.addPrescription);



module.exports=route